"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BadgeDollarSign, Building2, Mail, Phone, Save, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { createCustomer, getCustomer, isAuthExpiredError, updateCustomer } from "@/lib/api";
import { formatCurrency, formatInputDate } from "@/lib/format";
import type { CustomerInput, Status } from "@/types/crm";
import { CustomerAvatar } from "@/components/customers/customer-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const blankCustomer: CustomerInput = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "Lead",
  source: "Website",
  value: 0,
  owner: "M Abdullah",
  lastContacted: formatInputDate(),
  notes: "",
};

export function CustomerForm({
  mode,
  customerId,
}: {
  mode: "create" | "edit";
  customerId?: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState<CustomerInput>(blankCustomer);
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!customerId) return;
    getCustomer(customerId)
      .then((response) => {
        const customer = response.data;
        setForm({
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          company: customer.company,
          status: customer.status,
          source: customer.source,
          value: customer.value,
          owner: customer.owner,
          lastContacted: formatInputDate(customer.lastContacted),
          notes: customer.notes || "",
        });
      })
      .catch((error) => {
        if (isAuthExpiredError(error)) return;
        toast.error(error instanceof Error ? error.message : "Could not load customer");
      })
      .finally(() => setLoading(false));
  }, [customerId]);

  const updateField = <K extends keyof CustomerInput>(field: K, value: CustomerInput[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...form,
        value: Number(form.value),
      };

      if (mode === "edit" && customerId) {
        await updateCustomer(customerId, payload);
        toast.success("Customer updated");
      } else {
        await createCustomer(payload);
        toast.success("Customer created");
      }

      router.replace("/dashboard/customers");
    } catch (error) {
      if (isAuthExpiredError(error)) return;
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="soft-crm-card rounded-[2rem] border premium-border p-8 text-black/48">Loading customer...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">
            {mode === "edit" ? "Edit account" : "New account"}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {mode === "edit" ? "Refine customer record" : "Add customer record"}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-black/48">
            Capture the fields your CRM uses for status tracking, filtering, and invoice generation.
          </p>
        </div>
        <Button variant="outline" className="h-11 rounded-full bg-white/80" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[330px_1fr]">
        <aside className="soft-crm-card rounded-[2.2rem] border premium-border p-5">
          <div className="rounded-[1.8rem] bg-black p-5 text-white">
            <CustomerAvatar name={form.name || "New Customer"} className="mb-8 size-16 text-lg" />
            <p className="text-3xl font-semibold leading-tight">
              {form.name || "Customer name"}
            </p>
            <p className="mt-2 text-sm text-white/52">{form.company || "Company profile"}</p>
          </div>
          <div className="mt-4 space-y-3">
            {[
              [Mail, form.email || "email@company.com"],
              [Phone, form.phone || "+92 300 0000000"],
              [Building2, form.source || "Source"],
              [BadgeDollarSign, formatCurrency(Number(form.value) || 0)],
            ].map(([Icon, value]) => (
              <div key={String(value)} className="flex items-center gap-3 rounded-[1.3rem] bg-white p-3">
                <div className="grid size-9 place-items-center rounded-full bg-[#eef0f3]">
                  <Icon className="size-4 text-black/50" />
                </div>
                <p className="min-w-0 truncate text-sm font-medium">{String(value)}</p>
              </div>
            ))}
          </div>
        </aside>

        <Card className="soft-crm-card rounded-[2.2rem] border premium-border">
          <CardContent className="p-5">
            <form className="grid gap-5 md:grid-cols-2" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Customer name</Label>
                <Input id="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" value={form.company} onChange={(event) => updateField("company", event.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(value) => updateField("status", value as Status)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lead">Lead</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Input id="source" value={form.source} onChange={(event) => updateField("source", event.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Pipeline value</Label>
                <Input id="value" type="number" min={0} value={form.value} onChange={(event) => updateField("value", Number(event.target.value))} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastContacted">Last contacted</Label>
                <Input id="lastContacted" type="date" value={String(form.lastContacted)} onChange={(event) => updateField("lastContacted", event.target.value)} required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="owner">Owner</Label>
                <Input id="owner" value={form.owner} onChange={(event) => updateField("owner", event.target.value)} required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" value={form.notes} onChange={(event) => updateField("notes", event.target.value)} rows={5} />
              </div>
              <div className="flex justify-end md:col-span-2">
                <Button className="h-11 rounded-full bg-black px-6 text-white hover:bg-black/85" type="submit" disabled={saving}>
                  {saving ? <Sparkles className="size-4 animate-pulse" /> : <Save className="size-4" />}
                  {saving ? "Saving..." : mode === "edit" ? "Update customer" : "Create customer"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
