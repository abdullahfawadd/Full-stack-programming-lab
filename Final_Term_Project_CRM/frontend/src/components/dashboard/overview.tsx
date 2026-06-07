"use client";

import { DragEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeDollarSign,
  CalendarDays,
  Check,
  Clock3,
  GripVertical,
  Plus,
  Sparkles,
  Users,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { getCustomers, getInvoices, isAuthExpiredError, updateCustomer } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Customer, Invoice, Status } from "@/types/crm";
import { CustomerAvatar } from "@/components/customers/customer-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type BoardCustomer = Customer & {
  completed?: boolean;
};

const lanes: Array<{
  status: Status;
  title: string;
  detail: string;
  accent: string;
}> = [
  {
    status: "Lead",
    title: "Case Allocation",
    detail: "New relationship intake",
    accent: "bg-[#ffe38a]",
  },
  {
    status: "Active",
    title: "Issue Identification",
    detail: "Accounts in service",
    accent: "bg-[#87eec4]",
  },
  {
    status: "Inactive",
    title: "Technical Resolution",
    detail: "Paused or closed accounts",
    accent: "bg-[#cfd5de]",
  },
];

const statusStyles: Record<Status, string> = {
  Lead: "bg-[#fff1b8] text-[#7c5600]",
  Active: "bg-[#d4f8e8] text-[#087a48]",
  Inactive: "bg-[#e5e9ee] text-black/50",
};

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={label === "Invoices" ? "/dashboard/invoices" : label === "Total customers" ? "/dashboard/customers" : "/dashboard/reports"}
      className="soft-crm-card group rounded-[2rem] border premium-border p-5 transition hover:-translate-y-1 hover:bg-white"
    >
      <div className="mb-7 flex items-center justify-between">
        <div className="grid size-11 place-items-center rounded-full bg-white">
          <Icon className="size-5 text-black/62" />
        </div>
        <ArrowUpRight className="size-4 text-black/35 transition group-hover:text-black" />
      </div>
      <p className="text-sm text-black/52">{label}</p>
      <p className="mt-2 text-4xl font-semibold tracking-tight">{value}</p>
      <p className="mt-3 text-xs leading-5 text-black/42">{detail}</p>
    </Link>
  );
}

function payloadForCustomer(customer: Customer, status: Status) {
  return {
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    company: customer.company,
    status,
    source: customer.source,
    value: customer.value,
    owner: customer.owner,
    lastContacted: customer.lastContacted,
    notes: customer.notes || "",
  };
}

function JourneyCard({
  customer,
  index,
  onToggleComplete,
  onDragStart,
}: {
  customer: BoardCustomer;
  index: number;
  onToggleComplete: (customerId: string) => void;
  onDragStart: (customerId: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.025 }}
      draggable
      onDragStart={() => onDragStart(customer._id)}
      className="group rounded-[1.5rem] bg-white p-4 shadow-[0_12px_30px_rgb(50_56_68/0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgb(50_56_68/0.14)]"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <CustomerAvatar name={customer.name} className="size-10" />
          <GripVertical className="size-4 text-black/20 opacity-0 transition group-hover:opacity-100" />
        </div>
        <button
          type="button"
          onClick={() => onToggleComplete(customer._id)}
          className={`grid size-9 place-items-center rounded-full transition ${
            customer.completed
              ? "bg-black text-white"
              : "bg-[#eef0f3] text-black/38 hover:bg-black hover:text-white"
          }`}
          aria-label={`Mark ${customer.name} ${customer.completed ? "open" : "complete"}`}
        >
          <Check className="size-4" />
        </button>
      </div>
      <p className="text-sm font-semibold leading-snug">{customer.name}</p>
      <p className="mt-1 text-xs text-black/45">{customer.company}</p>
      <div className="mt-4 flex items-center justify-between">
        <Badge className={statusStyles[customer.status]}>{customer.status}</Badge>
        <span className="font-mono text-xs text-black/35">#{String(index + 1).padStart(2, "0")}</span>
      </div>
    </motion.div>
  );
}

export function DashboardOverview() {
  const [customers, setCustomers] = useState<BoardCustomer[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<Status | null>(null);

  useEffect(() => {
    Promise.all([getCustomers(), getInvoices()])
      .then(([customerResponse, invoiceResponse]) => {
        setCustomers(customerResponse.data.map((customer, index) => ({ ...customer, completed: index % 4 === 0 })));
        setInvoices(invoiceResponse.data);
      })
      .catch((error) => {
        if (isAuthExpiredError(error)) return;
        toast.error(error instanceof Error ? error.message : "Could not load dashboard data");
      })
      .finally(() => setLoading(false));
  }, []);

  const metrics = useMemo(() => {
    const pipeline = customers.reduce((total, customer) => total + customer.value, 0);
    const active = customers.filter((customer) => customer.status === "Active").length;
    const openInvoices = invoices.reduce((total, invoice) => total + invoice.total, 0);

    return [
      {
        label: "Total customers",
        value: String(customers.length),
        detail: "Minimum 15 records are seeded in MongoDB.",
        icon: Users,
      },
      {
        label: "Active accounts",
        value: String(active),
        detail: "Accounts currently moving through service.",
        icon: Clock3,
      },
      {
        label: "Pipeline value",
        value: formatCurrency(pipeline),
        detail: "Combined estimated opportunity value.",
        icon: BadgeDollarSign,
      },
      {
        label: "Invoices",
        value: String(invoices.length),
        detail: `${formatCurrency(openInvoices)} recorded invoice total.`,
        icon: WalletCards,
      },
    ];
  }, [customers, invoices]);

  const groupedCustomers = useMemo(
    () =>
      lanes.map((lane) => ({
        ...lane,
        customers: customers.filter((customer) => customer.status === lane.status).slice(0, 5),
      })),
    [customers],
  );

  const toggleComplete = (customerId: string) => {
    setCustomers((current) =>
      current.map((customer) =>
        customer._id === customerId ? { ...customer, completed: !customer.completed } : customer,
      ),
    );
  };

  const moveCustomer = async (targetStatus: Status) => {
    if (!draggingId) return;
    const customer = customers.find((item) => item._id === draggingId);
    setDropTarget(null);
    setDraggingId(null);

    if (!customer || customer.status === targetStatus) return;

    setCustomers((current) =>
      current.map((item) =>
        item._id === customer._id ? { ...item, status: targetStatus } : item,
      ),
    );

    try {
      await updateCustomer(customer._id, payloadForCustomer(customer, targetStatus));
      toast.success(`${customer.name} moved to ${targetStatus}`);
    } catch (error) {
      if (isAuthExpiredError(error)) return;
      setCustomers((current) =>
        current.map((item) =>
          item._id === customer._id ? { ...item, status: customer.status } : item,
        ),
      );
      toast.error(error instanceof Error ? error.message : "Status update failed");
    }
  };

  if (loading) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-[520px] rounded-[2rem]" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} className="h-40 rounded-[2rem]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <section className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="soft-crm-card overflow-hidden rounded-[2.4rem] border premium-border p-6">
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm text-black/42">Customer Journeys</p>
              <h1 className="mt-1 text-4xl font-semibold tracking-tight md:text-5xl">
                Live CRM operations board
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild className="rounded-full bg-black px-5 text-white hover:bg-black/85">
                <Link href="/dashboard/customers/new">
                  <Plus className="size-4" />
                  New case
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full bg-white/70">
                <Link href="/dashboard/invoices">Invoice studio</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {groupedCustomers.map((lane, columnIndex) => (
              <div
                key={lane.status}
                onDragOver={(event: DragEvent<HTMLDivElement>) => {
                  event.preventDefault();
                  setDropTarget(lane.status);
                }}
                onDragLeave={() => setDropTarget(null)}
                onDrop={() => void moveCustomer(lane.status)}
                className={`rounded-[2rem] p-4 transition ${
                  dropTarget === lane.status ? "bg-white shadow-inner" : "bg-[#e8ebef]"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`size-2.5 rounded-full ${lane.accent}`} />
                      <p className="text-sm font-semibold">{lane.title}</p>
                    </div>
                    <p className="mt-1 text-xs text-black/42">{lane.detail}</p>
                  </div>
                  <Link
                    href="/dashboard/reports"
                    className="grid size-9 place-items-center rounded-full bg-white text-black/45 transition hover:text-black"
                    aria-label={`${lane.title} report`}
                  >
                    <CalendarDays className="size-4" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {lane.customers.map((customer, index) => (
                    <JourneyCard
                      key={customer._id}
                      customer={customer}
                      index={columnIndex * 5 + index}
                      onToggleComplete={toggleComplete}
                      onDragStart={setDraggingId}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="soft-crm-card rounded-[2.4rem] border premium-border p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-black/42">Operator</p>
              <h2 className="text-2xl font-semibold">M Abdullah</h2>
            </div>
            <Image
              src="/picture_abd.png"
              alt="M Abdullah"
              width={72}
              height={72}
              className="size-[72px] rounded-[1.5rem] object-cover shadow-lg"
            />
          </div>
          <div className="rounded-[1.7rem] bg-black p-5 text-white">
            <p className="text-sm text-white/48">Current focus</p>
            <p className="mt-2 text-3xl font-semibold leading-tight">
              Customers, invoices, and status flow in one place.
            </p>
          </div>
          <div className="mt-4 space-y-3">
            {invoices.slice(0, 3).map((invoice) => (
              <Link key={invoice._id} href="/dashboard/invoices" className="block rounded-[1.4rem] bg-white p-4 transition hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs text-black/45">{invoice.invoiceNumber}</p>
                  <Badge className="bg-black text-white">{invoice.status}</Badge>
                </div>
                <p className="mt-3 font-semibold">{invoice.customer.name}</p>
                <p className="text-sm text-black/45">{formatDate(invoice.invoiceDate)}</p>
                <p className="mt-3 text-xl font-semibold">{formatCurrency(invoice.total)}</p>
              </Link>
            ))}
          </div>
          <Button asChild variant="outline" className="mt-4 h-11 w-full rounded-full bg-white/70">
            <Link href="/dashboard/reports">
              <Sparkles className="size-4" />
              View reports
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>
    </div>
  );
}
