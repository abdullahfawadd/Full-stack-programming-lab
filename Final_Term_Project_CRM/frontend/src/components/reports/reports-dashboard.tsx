"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CircleDollarSign, FileText, Target, Users, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { getCustomers, getInvoices, isAuthExpiredError } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Customer, Invoice, Status } from "@/types/crm";
import { CustomerAvatar } from "@/components/customers/customer-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const statuses: Status[] = ["Lead", "Active", "Inactive"];

const statusColors: Record<Status, string> = {
  Lead: "#f6c85f",
  Active: "#17c995",
  Inactive: "#b9c1cc",
};

function InsightCard({
  label,
  value,
  helper,
  icon: Icon,
}: {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
}) {
  return (
    <div className="soft-crm-card rounded-[1.8rem] border premium-border p-5">
      <div className="mb-6 flex items-center justify-between">
        <div className="grid size-11 place-items-center rounded-full bg-white">
          <Icon className="size-5 text-black/52" />
        </div>
        <ArrowUpRight className="size-4 text-black/35" />
      </div>
      <p className="text-sm text-black/48">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-xs text-black/40">{helper}</p>
    </div>
  );
}

export function ReportsDashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCustomers(), getInvoices()])
      .then(([customerResponse, invoiceResponse]) => {
        setCustomers(customerResponse.data);
        setInvoices(invoiceResponse.data);
      })
      .catch((error) => {
        if (isAuthExpiredError(error)) return;
        toast.error(error instanceof Error ? error.message : "Could not load reports");
      })
      .finally(() => setLoading(false));
  }, []);

  const statusStats = useMemo(
    () =>
      statuses.map((status) => {
        const list = customers.filter((customer) => customer.status === status);
        return {
          status,
          count: list.length,
          value: list.reduce((sum, customer) => sum + customer.value, 0),
        };
      }),
    [customers],
  );

  const sourceStats = useMemo(() => {
    const grouped = customers.reduce<Record<string, number>>((acc, customer) => {
      acc[customer.source] = (acc[customer.source] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(grouped).sort(([, a], [, b]) => b - a).slice(0, 6);
  }, [customers]);

  const totalPipeline = useMemo(
    () => customers.reduce((sum, customer) => sum + customer.value, 0),
    [customers],
  );

  const totalInvoice = useMemo(
    () => invoices.reduce((sum, invoice) => sum + invoice.total, 0),
    [invoices],
  );

  const statusPercentages = useMemo(() => {
    const total = Math.max(customers.length, 1);
    return statusStats.map((stat, index) => {
      const start = statusStats
        .slice(0, index)
        .reduce((sum, previous) => sum + (previous.count / total) * 100, 0);
      const end = start + (stat.count / total) * 100;
      return `${statusColors[stat.status]} ${start}% ${end}%`;
    });
  }, [customers.length, statusStats]);

  if (loading) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-32 rounded-[2rem]" />
        <div className="grid gap-4 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => <Skeleton key={item} className="h-40 rounded-[2rem]" />)}
        </div>
        <Skeleton className="h-[420px] rounded-[2rem]" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Visual reports</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">CRM performance cockpit</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/48">
            Visualize status distribution, pipeline value, acquisition sources, and invoice activity.
          </p>
        </div>
        <Button asChild className="h-11 rounded-full bg-black px-5 text-white hover:bg-black/85">
          <Link href="/dashboard/invoices">
            <FileText className="size-4" />
            Create invoice
          </Link>
        </Button>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <InsightCard label="Customers" value={String(customers.length)} helper="Across all statuses" icon={Users} />
        <InsightCard label="Pipeline" value={formatCurrency(totalPipeline)} helper="Total customer value" icon={Target} />
        <InsightCard label="Invoices" value={String(invoices.length)} helper="Stored in MongoDB" icon={FileText} />
        <InsightCard label="Invoice total" value={formatCurrency(totalInvoice)} helper="Generated billing value" icon={CircleDollarSign} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[420px_1fr]">
        <div className="soft-crm-card rounded-[2.2rem] border premium-border p-5">
          <div className="mb-5">
            <p className="text-sm text-black/42">Status split</p>
            <h2 className="text-2xl font-semibold">Customer distribution</h2>
          </div>
          <div className="grid place-items-center rounded-[2rem] bg-white p-8">
            <div
              className="relative grid size-56 place-items-center rounded-full"
              style={{ background: `conic-gradient(${statusPercentages.join(", ")})` }}
            >
              <div className="grid size-36 place-items-center rounded-full bg-white text-center shadow-inner">
                <div>
                  <p className="text-4xl font-semibold">{customers.length}</p>
                  <p className="text-sm text-black/42">records</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {statusStats.map((stat) => (
              <div key={stat.status} className="rounded-[1.3rem] bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ backgroundColor: statusColors[stat.status] }} />
                    <p className="font-semibold">{stat.status}</p>
                  </div>
                  <p className="text-sm text-black/45">{stat.count}</p>
                </div>
                <p className="mt-2 text-sm text-black/45">{formatCurrency(stat.value)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <div className="soft-crm-card rounded-[2.2rem] border premium-border p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-black/42">Pipeline by status</p>
                <h2 className="text-2xl font-semibold">Value movement</h2>
              </div>
              <Badge className="bg-black text-white">{formatCurrency(totalPipeline)}</Badge>
            </div>
            <div className="space-y-4">
              {statusStats.map((stat) => (
                <div key={stat.status}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <p className="font-medium">{stat.status}</p>
                    <p className="text-black/48">{formatCurrency(stat.value)}</p>
                  </div>
                  <div className="h-4 rounded-full bg-white">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.max(8, (stat.value / Math.max(totalPipeline, 1)) * 100)}%`,
                        backgroundColor: statusColors[stat.status],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="soft-crm-card rounded-[2.2rem] border premium-border p-5">
              <div className="mb-5">
                <p className="text-sm text-black/42">Acquisition</p>
                <h2 className="text-2xl font-semibold">Source ranking</h2>
              </div>
              <div className="space-y-3">
                {sourceStats.map(([source, count]) => (
                  <div key={source} className="rounded-[1.3rem] bg-white p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-semibold">{source}</p>
                      <p className="text-sm text-black/45">{count}</p>
                    </div>
                    <div className="h-2 rounded-full bg-[#edf0f3]">
                      <div
                        className="h-full rounded-full bg-black"
                        style={{ width: `${Math.max(14, (count / Math.max(customers.length, 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="soft-crm-card rounded-[2.2rem] border premium-border p-5">
              <div className="mb-5">
                <p className="text-sm text-black/42">Top opportunities</p>
                <h2 className="text-2xl font-semibold">High-value accounts</h2>
              </div>
              <div className="space-y-3">
                {[...customers]
                  .sort((a, b) => b.value - a.value)
                  .slice(0, 5)
                  .map((customer) => (
                    <Link
                      key={customer._id}
                      href={`/dashboard/customers/${customer._id}/edit`}
                      className="flex items-center justify-between rounded-[1.3rem] bg-white p-4 transition hover:-translate-y-0.5"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <CustomerAvatar name={customer.name} className="size-10" />
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{customer.name}</p>
                          <p className="truncate text-sm text-black/42">{customer.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(customer.value)}</p>
                        <p className="text-xs text-black/42">{formatDate(customer.lastContacted)}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="soft-crm-card rounded-[2.2rem] border premium-border p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-black/42">Invoice activity</p>
            <h2 className="text-2xl font-semibold">Latest billing records</h2>
          </div>
          <Badge className="bg-[#d4f8e8] text-[#087a48]">{invoices.length} records</Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {invoices.slice(0, 6).map((invoice) => (
            <div key={invoice._id} className="rounded-[1.5rem] bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-black/42">{invoice.invoiceNumber}</p>
                <Badge className="bg-black text-white">{invoice.status}</Badge>
              </div>
              <p className="mt-4 font-semibold">{invoice.customer.name}</p>
              <p className="text-sm text-black/42">{formatDate(invoice.invoiceDate)}</p>
              <p className="mt-4 text-2xl font-semibold">{formatCurrency(invoice.total)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
