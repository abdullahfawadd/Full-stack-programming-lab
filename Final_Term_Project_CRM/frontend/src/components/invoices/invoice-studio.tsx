"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { Download, FileText, Plus, ReceiptText, Trash2, WalletCards } from "lucide-react";
import { toast } from "sonner";
import { createInvoice, getCustomers, getInvoices, isAuthExpiredError } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Customer, Invoice, InvoiceStatus, ServiceLine } from "@/types/crm";
import { CustomerAvatar } from "@/components/customers/customer-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const blankLine: ServiceLine = {
  description: "CRM service package",
  quantity: 1,
  rate: 25000,
};

const defaultDueDate = "2026-06-14";

const statusStyles: Record<InvoiceStatus, string> = {
  Draft: "bg-[#e7e9ee] text-black/55",
  Sent: "bg-black text-white",
  Paid: "bg-[#d4f8e8] text-[#087a48]",
};

const pdfCurrency = (value: number) => `Rs ${new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(value)}`;

function InvoicePreview({
  invoice,
  selectedCustomer,
  services,
  summary,
  dueDate,
  total,
  status,
  onDownload,
}: {
  invoice: Invoice | null;
  selectedCustomer?: Customer;
  services: ServiceLine[];
  summary: string;
  dueDate: string;
  total: number;
  status: InvoiceStatus;
  onDownload: () => void;
}) {
  const customer = invoice?.customer || selectedCustomer;
  const lines = invoice?.services || services;
  const invoiceNumber = invoice?.invoiceNumber || "VCR-DRAFT";

  return (
    <aside className="soft-crm-card rounded-[2.2rem] border premium-border p-4">
      <div className="overflow-hidden rounded-[1.8rem] bg-white shadow-[0_18px_55px_rgb(50_56_68/0.12)]">
        <div className="bg-black p-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-white/48">Vantage CRM</p>
              <h2 className="mt-1 text-3xl font-semibold tracking-tight">Invoice</h2>
            </div>
            <Badge className={statusStyles[invoice?.status || status]}>{invoice?.status || status}</Badge>
          </div>
          <p className="mt-8 font-mono text-sm text-white/58">{invoiceNumber}</p>
        </div>

        <div className="p-5">
          <div className="flex items-start gap-3">
            <CustomerAvatar name={customer?.name || "Customer"} className="size-12" />
            <div>
              <p className="text-sm text-black/42">Bill to</p>
              <p className="text-xl font-semibold">{customer?.name || "Select a customer"}</p>
              <p className="text-sm text-black/48">{customer?.company || "Company"}</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-[1.2rem] bg-[#f1f3f5] p-3">
              <p className="text-black/42">Date</p>
              <p className="mt-1 font-medium">{invoice ? formatDate(invoice.invoiceDate) : formatDate(new Date())}</p>
            </div>
            <div className="rounded-[1.2rem] bg-[#f1f3f5] p-3">
              <p className="text-black/42">Due</p>
              <p className="mt-1 font-medium">{formatDate(invoice?.dueDate || dueDate)}</p>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            {lines.map((service, index) => (
              <div key={`${service.description}-${index}`} className="rounded-[1.2rem] border premium-border p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold">{service.description}</p>
                  <p className="text-sm font-semibold">{formatCurrency(Number(service.quantity) * Number(service.rate))}</p>
                </div>
                <p className="mt-1 text-xs text-black/42">
                  {service.quantity} x {formatCurrency(Number(service.rate))}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[1.5rem] bg-[#f1f3f5] p-4">
            <p className="text-sm text-black/42">Summary</p>
            <p className="mt-1 text-sm leading-6">{invoice?.summary || summary}</p>
          </div>

          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="text-sm text-black/42">Total due</p>
              <p className="text-4xl font-semibold tracking-tight">{formatCurrency(invoice?.total || total)}</p>
            </div>
            <Button className="rounded-full bg-black px-5 text-white hover:bg-black/85" onClick={onDownload}>
              <Download className="size-4" />
              PDF
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function InvoiceStudio() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [summary, setSummary] = useState("Professional services and CRM operations support.");
  const [dueDate, setDueDate] = useState(defaultDueDate);
  const [status, setStatus] = useState<InvoiceStatus>("Draft");
  const [services, setServices] = useState<ServiceLine[]>([blankLine]);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [saving, setSaving] = useState(false);

  const refresh = async () => {
    const [customerResponse, invoiceResponse] = await Promise.all([getCustomers(), getInvoices()]);
    setCustomers(customerResponse.data);
    setInvoices(invoiceResponse.data);
    if (!customerId && customerResponse.data[0]) setCustomerId(customerResponse.data[0]._id);
  };

  useEffect(() => {
    let mounted = true;

    const loadInitialData = async () => {
      try {
        const [customerResponse, invoiceResponse] = await Promise.all([getCustomers(), getInvoices()]);
        if (!mounted) return;

        setCustomers(customerResponse.data);
        setInvoices(invoiceResponse.data);
        if (customerResponse.data[0]) setCustomerId(customerResponse.data[0]._id);
      } catch (error) {
        if (isAuthExpiredError(error)) return;
        if (mounted) {
          toast.error(error instanceof Error ? error.message : "Could not load invoice data");
        }
      }
    };

    void loadInitialData();

    return () => {
      mounted = false;
    };
  }, []);

  const selectedCustomer = customers.find((customer) => customer._id === customerId);
  const total = useMemo(
    () => services.reduce((sum, service) => sum + Number(service.quantity) * Number(service.rate), 0),
    [services],
  );

  const invoiceTotal = useMemo(
    () => invoices.reduce((sum, invoice) => sum + invoice.total, 0),
    [invoices],
  );

  const updateService = <K extends keyof ServiceLine>(index: number, key: K, value: ServiceLine[K]) => {
    setServices((current) =>
      current.map((service, serviceIndex) =>
        serviceIndex === index ? { ...service, [key]: value } : service,
      ),
    );
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await createInvoice({
        customerId,
        services: services.map((service) => ({
          ...service,
          quantity: Number(service.quantity),
          rate: Number(service.rate),
        })),
        summary,
        dueDate,
        status,
      });
      setCurrentInvoice(response.data);
      toast.success("Invoice generated");
      await refresh();
    } catch (error) {
      if (isAuthExpiredError(error)) return;
      toast.error(error instanceof Error ? error.message : "Invoice failed");
    } finally {
      setSaving(false);
    }
  };

  const downloadInvoice = (invoice = currentInvoice) => {
    if (!invoice) {
      if (!selectedCustomer) {
        toast.error("Select a customer first");
        return;
      }
    }

    const source = invoice || {
      invoiceNumber: "VCR-DRAFT",
      customer: selectedCustomer!,
      services,
      summary,
      dueDate,
      invoiceDate: new Date().toISOString(),
      total,
      status,
    };

    const doc = new jsPDF();
    doc.setFillColor(19, 22, 30);
    doc.roundedRect(12, 12, 186, 34, 6, 6, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Vantage CRM", 20, 27);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Customer Relationship Invoice", 20, 36);
    doc.setFont("helvetica", "bold");
    doc.text(source.invoiceNumber, 150, 27);
    doc.setFont("helvetica", "normal");
    doc.text(source.status, 150, 36);

    doc.setTextColor(19, 22, 30);
    doc.setFillColor(242, 244, 246);
    doc.roundedRect(12, 56, 186, 38, 5, 5, "F");
    doc.setFontSize(9);
    doc.setTextColor(116, 124, 137);
    doc.text("BILL TO", 20, 66);
    doc.text("INVOICE DATE", 126, 66);
    doc.text("DUE DATE", 162, 66);
    doc.setTextColor(19, 22, 30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(source.customer.name, 20, 76);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(source.customer.company, 20, 84);
    doc.text(formatDate(source.invoiceDate), 126, 76);
    doc.text(formatDate(source.dueDate), 162, 76);

    let y = 112;
    doc.setFillColor(19, 22, 30);
    doc.roundedRect(12, y - 8, 186, 11, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("SERVICE", 20, y);
    doc.text("QTY", 126, y);
    doc.text("RATE", 146, y);
    doc.text("TOTAL", 172, y);
    y += 14;

    source.services.forEach((service) => {
      doc.setTextColor(19, 22, 30);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(service.description, 20, y, { maxWidth: 92 });
      doc.text(String(service.quantity), 128, y);
      doc.text(pdfCurrency(service.rate), 146, y);
      doc.text(pdfCurrency(service.quantity * service.rate), 172, y);
      y += 12;
    });

    y += 6;
    doc.setDrawColor(224, 228, 234);
    doc.line(12, y, 198, y);
    y += 14;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Total", 126, y);
    doc.text(pdfCurrency(source.total), 158, y);
    y += 18;

    doc.setFillColor(242, 244, 246);
    doc.roundedRect(12, y, 186, 28, 5, 5, "F");
    doc.setTextColor(116, 124, 137);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("SUMMARY", 20, y + 9);
    doc.setTextColor(19, 22, 30);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(source.summary || "No summary provided.", 20, y + 18, { maxWidth: 166 });

    doc.save(`${source.invoiceNumber}.pdf`);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Invoice studio</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Generate polished customer invoices</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/48">
            Build a customer invoice, save it to MongoDB, and download a modern PDF.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:w-[360px]">
          <div className="soft-crm-card rounded-[1.4rem] border premium-border p-4">
            <FileText className="mb-4 size-5 text-black/42" />
            <p className="text-2xl font-semibold">{invoices.length}</p>
            <p className="text-xs text-black/42">Saved invoices</p>
          </div>
          <div className="soft-crm-card rounded-[1.4rem] border premium-border p-4">
            <WalletCards className="mb-4 size-5 text-black/42" />
            <p className="text-2xl font-semibold">{formatCurrency(invoiceTotal)}</p>
            <p className="text-xs text-black/42">Recorded total</p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_430px]">
        <Card className="soft-crm-card rounded-[2.2rem] border premium-border">
          <CardContent className="p-5">
            <form className="space-y-5" onSubmit={onSubmit}>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2 md:col-span-2">
                  <Label>Customer</Label>
                  <Select value={customerId} onValueChange={setCustomerId}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Choose customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer._id} value={customer._id}>
                          {customer.name} - {customer.company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={status} onValueChange={(value) => setStatus(value as InvoiceStatus)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Sent">Sent</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due date</Label>
                  <Input id="dueDate" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} required className="bg-white" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="summary">Summary</Label>
                  <Textarea id="summary" value={summary} onChange={(event) => setSummary(event.target.value)} rows={3} className="bg-white" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Services</Label>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full bg-white"
                    onClick={() => setServices((current) => [...current, { ...blankLine }])}
                  >
                    <Plus className="size-4" />
                    Add line
                  </Button>
                </div>
                {services.map((service, index) => (
                  <div key={index} className="grid gap-3 rounded-[1.5rem] border premium-border bg-white p-3 md:grid-cols-[1fr_110px_140px_40px]">
                    <Input value={service.description} onChange={(event) => updateService(index, "description", event.target.value)} />
                    <Input type="number" min={1} value={service.quantity} onChange={(event) => updateService(index, "quantity", Number(event.target.value))} />
                    <Input type="number" min={0} value={service.rate} onChange={(event) => updateService(index, "rate", Number(event.target.value))} />
                    <Button
                      type="button"
                      size="icon-lg"
                      variant="ghost"
                      disabled={services.length === 1}
                      onClick={() => setServices((current) => current.filter((_, serviceIndex) => serviceIndex !== index))}
                      aria-label="Remove service"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 rounded-[1.7rem] bg-black p-5 text-white md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-white/48">Total amount</p>
                  <p className="text-4xl font-semibold tracking-tight">{formatCurrency(total)}</p>
                </div>
                <Button className="h-11 rounded-full bg-white px-5 text-black hover:bg-white/88" type="submit" disabled={saving || !selectedCustomer}>
                  <ReceiptText className="size-4" />
                  {saving ? "Generating..." : "Generate invoice"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <InvoicePreview
          invoice={currentInvoice}
          selectedCustomer={selectedCustomer}
          services={services}
          summary={summary}
          dueDate={dueDate}
          total={total}
          status={status}
          onDownload={() => downloadInvoice()}
        />
      </div>

      <Card className="soft-crm-card rounded-[2.2rem] border premium-border">
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Saved invoices</h2>
              <p className="mt-1 text-sm text-black/42">Download any invoice generated in this CRM.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[1.6rem] border premium-border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice._id} className="hover:bg-[#f6f7f8]">
                    <TableCell className="font-mono text-sm">{invoice.invoiceNumber}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <CustomerAvatar name={invoice.customer.name} className="size-9" />
                        {invoice.customer.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusStyles[invoice.status]}>{invoice.status}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{formatCurrency(invoice.total)}</TableCell>
                    <TableCell>
                      <Button size="icon-sm" variant="ghost" onClick={() => downloadInvoice(invoice)} aria-label="Download invoice">
                        <Download className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {invoices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-28 text-center text-black/45">
                      No saved invoices yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
