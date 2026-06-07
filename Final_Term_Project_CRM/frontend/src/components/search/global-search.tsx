"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  FileText,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { getCustomers, isAuthExpiredError } from "@/lib/api";
import { formatCurrency } from "@/lib/format";
import type { Customer, Status } from "@/types/crm";
import { CustomerAvatar } from "@/components/customers/customer-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const statusStyles: Record<Status, string> = {
  Lead: "bg-[#fff1b8] text-[#7c5600]",
  Active: "bg-[#d4f8e8] text-[#087a48]",
  Inactive: "bg-[#e5e9ee] text-black/50",
};

const quickActions = [
  { label: "Add customer", href: "/dashboard/customers/new", icon: Plus },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Invoices", href: "/dashboard/invoices", icon: FileText },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { label: "Calendar", href: "/dashboard/calendar", icon: CalendarDays },
];

export function GlobalSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || query.trim().length < 2) {
      return;
    }

    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await getCustomers({ search: query.trim() });
        setCustomers(response.data);
      } catch (error) {
        if (isAuthExpiredError(error)) return;
        toast.error(error instanceof Error ? error.message : "Search failed");
      } finally {
        setLoading(false);
      }
    }, 180);

    return () => window.clearTimeout(timer);
  }, [open, query]);

  const visibleCustomers = useMemo(() => customers.slice(0, 6), [customers]);
  const hasQuery = query.trim().length >= 2;

  const closeSearch = () => {
    setOpen(false);
    setQuery("");
  };

  const openCustomer = (customer: Customer) => {
    closeSearch();
    router.push(`/dashboard/customers/${customer._id}/edit`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon-lg"
          variant="outline"
          className="rounded-full bg-white/80"
          aria-label="Search customers"
        >
          <Search className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="top-[18%] max-w-xl translate-y-0 gap-0 overflow-hidden rounded-[1.8rem] border-black/10 bg-white/96 p-0 text-[#151820] shadow-[0_28px_90px_rgb(30_34_44/0.24)] backdrop-blur-xl"
        showCloseButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search CRM</DialogTitle>
          <DialogDescription>Search customers and open CRM sections.</DialogDescription>
        </DialogHeader>

        <div className="border-b premium-border p-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-black/35" />
            <Input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search customer, company, email..."
              className="h-[52px] rounded-full border-black/10 bg-[#f3f5f7] pl-11 pr-24 text-base shadow-none"
            />
            <kbd className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] text-black/38">
              Enter
            </kbd>
          </div>
        </div>

        <div className="max-h-[460px] overflow-y-auto p-3">
          {!hasQuery && (
            <div className="space-y-3">
              <div className="rounded-[1.4rem] bg-[#f3f5f7] p-4">
                <p className="text-sm font-semibold">Quick actions</p>
                <p className="mt-1 text-sm text-black/45">
                  Type at least 2 letters to search customer records.
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {quickActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <Link
                      key={action.href}
                      href={action.href}
                      onClick={closeSearch}
                      className="flex items-center justify-between rounded-[1.1rem] bg-[#f8f9fa] px-4 py-3 transition hover:bg-[#eef1f4]"
                    >
                      <span className="flex items-center gap-3 text-sm font-medium">
                        <span className="grid size-9 place-items-center rounded-full bg-white">
                          <Icon className="size-4 text-black/52" />
                        </span>
                        {action.label}
                      </span>
                      <ArrowRight className="size-4 text-black/32" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {hasQuery && loading && (
            <div className="rounded-[1.2rem] bg-[#f3f5f7] p-4 text-sm text-black/45">
              Searching customer records...
            </div>
          )}

          {hasQuery && !loading && (
            <div className="space-y-2">
              {visibleCustomers.map((customer) => (
                <button
                  key={customer._id}
                  type="button"
                  onClick={() => openCustomer(customer)}
                  className="group grid w-full grid-cols-[1fr_auto] items-center gap-3 rounded-[1.1rem] bg-[#f8f9fa] px-3 py-3 text-left transition hover:bg-[#eef1f4]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <CustomerAvatar name={customer.name} className="size-10" />
                    <div className="min-w-0">
                      <div className="flex min-w-0 items-center gap-2">
                        <p className="truncate text-sm font-semibold">{customer.name}</p>
                        <Badge className={statusStyles[customer.status]}>{customer.status}</Badge>
                      </div>
                      <p className="mt-1 flex items-center gap-1 truncate text-xs text-black/45">
                        <Building2 className="size-3" />
                        {customer.company} · {customer.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden text-right sm:block">
                      <p className="text-sm font-semibold">{formatCurrency(customer.value)}</p>
                      <p className="text-xs text-black/38">{customer.source}</p>
                    </div>
                    <ArrowRight className="size-4 text-black/30 transition group-hover:text-black" />
                  </div>
                </button>
              ))}

              {visibleCustomers.length === 0 && (
                <div className="rounded-[1.3rem] bg-[#f3f5f7] p-6 text-center">
                  <div className="mx-auto grid size-11 place-items-center rounded-full bg-white">
                    <Users className="size-5 text-black/42" />
                  </div>
                  <p className="mt-4 font-semibold">No customer found</p>
                  <p className="mt-1 text-sm text-black/45">Try a name, company, email, or source.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
