"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeDollarSign,
  CalendarDays,
  Clock3,
  Plus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { getCustomers, getInvoices, isAuthExpiredError } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Customer, Invoice, Status } from "@/types/crm";
import { CustomerAvatar } from "@/components/customers/customer-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type CalendarEvent = {
  id: string;
  date: Date;
  title: string;
  subtitle: string;
  type: "customer" | "invoice";
  status?: Status;
  amount?: number;
  href: string;
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const eventStyles: Record<Status, string> = {
  Lead: "bg-[#fff1b8] text-[#7c5600]",
  Active: "bg-[#d4f8e8] text-[#087a48]",
  Inactive: "bg-[#e5e9ee] text-black/50",
};

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function StatTile({
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
    <div className="soft-crm-card rounded-[1.6rem] border premium-border p-4">
      <div className="mb-5 flex items-center justify-between">
        <div className="grid size-10 place-items-center rounded-full bg-white">
          <Icon className="size-4 text-black/52" />
        </div>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs text-black/45">Live</span>
      </div>
      <p className="text-sm text-black/45">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-xs text-black/40">{helper}</p>
    </div>
  );
}

export function CustomerCalendar() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [visibleMonth, setVisibleMonth] = useState(new Date(2026, 5, 1));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCustomers(), getInvoices()])
      .then(([customerResponse, invoiceResponse]) => {
        setCustomers(customerResponse.data);
        setInvoices(invoiceResponse.data);
      })
      .catch((error) => {
        if (isAuthExpiredError(error)) return;
        toast.error(error instanceof Error ? error.message : "Could not load calendar");
      })
      .finally(() => setLoading(false));
  }, []);

  const events = useMemo<CalendarEvent[]>(() => {
    const customerEvents = customers.map((customer) => ({
      id: `customer-${customer._id}`,
      date: new Date(customer.lastContacted),
      title: customer.name,
      subtitle: customer.company,
      type: "customer" as const,
      status: customer.status,
      amount: customer.value,
      href: `/dashboard/customers/${customer._id}/edit`,
    }));

    const invoiceEvents = invoices.map((invoice) => ({
      id: `invoice-${invoice._id}`,
      date: new Date(invoice.dueDate),
      title: invoice.invoiceNumber,
      subtitle: invoice.customer.name,
      type: "invoice" as const,
      amount: invoice.total,
      href: "/dashboard/invoices",
    }));

    return [...customerEvents, ...invoiceEvents].sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [customers, invoices]);

  const monthEvents = useMemo(
    () => events.filter((event) => monthKey(event.date) === monthKey(visibleMonth)),
    [events, visibleMonth],
  );

  const days = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const mondayOffset = (firstDay + 6) % 7;
    const slots: Array<Date | null> = Array.from({ length: mondayOffset }, () => null);

    for (let day = 1; day <= daysInMonth; day += 1) {
      slots.push(new Date(year, month, day));
    }

    while (slots.length % 7 !== 0) {
      slots.push(null);
    }

    return slots;
  }, [visibleMonth]);

  const activeCount = customers.filter((customer) => customer.status === "Active").length;
  const invoiceDueCount = monthEvents.filter((event) => event.type === "invoice").length;
  const agenda = monthEvents.slice(0, 7);

  const changeMonth = (offset: number) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  };

  if (loading) {
    return (
      <div className="space-y-5">
        <Skeleton className="h-32 rounded-[2rem]" />
        <Skeleton className="h-[620px] rounded-[2rem]" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">CRM calendar</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Relationship schedule</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/48">
            A calendar layout for customer follow-ups, invoice due dates, and daily CRM action.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white/72 p-1 shadow-[0_12px_36px_rgb(50_56_68/0.08)]">
          <Button size="icon-lg" variant="ghost" className="rounded-full" onClick={() => changeMonth(-1)} aria-label="Previous month">
            <ArrowLeft className="size-4" />
          </Button>
          <p className="min-w-40 text-center text-sm font-semibold">
            {visibleMonth.toLocaleString("en", { month: "long", year: "numeric" })}
          </p>
          <Button size="icon-lg" variant="ghost" className="rounded-full" onClick={() => changeMonth(1)} aria-label="Next month">
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Month items" value={String(monthEvents.length)} helper="Follow-ups and invoice dates" icon={CalendarDays} />
        <StatTile label="Active accounts" value={String(activeCount)} helper="Customers currently in service" icon={Users} />
        <StatTile label="Invoices due" value={String(invoiceDueCount)} helper="Billing dates on calendar" icon={BadgeDollarSign} />
        <StatTile label="Next event" value={agenda[0] ? formatDate(agenda[0].date) : "Clear"} helper={agenda[0]?.title || "No scheduled event"} icon={Clock3} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="soft-crm-card overflow-hidden rounded-[2.2rem] border premium-border">
          <div className="grid grid-cols-7 border-b premium-border bg-white/56">
            {weekDays.map((day) => (
              <div key={day} className="px-3 py-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-black/42">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              const dayEvents = day ? monthEvents.filter((event) => sameDay(event.date, day)) : [];
              const isToday = day ? sameDay(day, new Date(2026, 5, 7)) : false;

              return (
                <div
                  key={day?.toISOString() || `empty-${index}`}
                  className={`min-h-[138px] border-b border-r border-black/[0.06] bg-white/40 p-3 ${
                    day ? "hover:bg-white/70" : "bg-white/12"
                  }`}
                >
                  {day && (
                    <>
                      <div className="mb-2 flex items-center justify-between">
                        <span
                          className={`grid size-8 place-items-center rounded-full text-sm font-semibold ${
                            isToday ? "bg-black text-white" : "bg-white text-black/62"
                          }`}
                        >
                          {day.getDate()}
                        </span>
                        {dayEvents.length > 2 && <span className="text-xs text-black/38">+{dayEvents.length - 2}</span>}
                      </div>
                      <div className="space-y-2">
                        {dayEvents.slice(0, 2).map((event) => (
                          <Link
                            key={event.id}
                            href={event.href}
                            className={`block rounded-xl px-2.5 py-2 text-xs transition hover:-translate-y-0.5 ${
                              event.type === "invoice"
                                ? "bg-black text-white"
                                : eventStyles[event.status || "Lead"]
                            }`}
                          >
                            <p className="truncate font-semibold">{event.title}</p>
                            <p className="truncate opacity-70">{event.subtitle}</p>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="soft-crm-card rounded-[2.2rem] border premium-border p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-black/42">Agenda</p>
                <h2 className="text-2xl font-semibold">This month</h2>
              </div>
              <Button asChild size="icon-lg" className="rounded-full bg-black text-white hover:bg-black/85" aria-label="Add customer">
                <Link href="/dashboard/customers/new">
                  <Plus className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="space-y-3">
              {agenda.map((event) => (
                <Link key={event.id} href={event.href} className="block rounded-[1.4rem] bg-white p-4 transition hover:-translate-y-0.5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      {event.type === "customer" ? (
                        <CustomerAvatar name={event.title} className="size-10" />
                      ) : (
                        <div className="grid size-10 place-items-center rounded-full bg-black text-white">
                          <BadgeDollarSign className="size-4" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{event.title}</p>
                        <p className="truncate text-sm text-black/42">{event.subtitle}</p>
                      </div>
                    </div>
                    <Badge className={event.type === "invoice" ? "bg-black text-white" : eventStyles[event.status || "Lead"]}>
                      {event.type === "invoice" ? "Invoice" : event.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-black/45">
                    <span>{formatDate(event.date)}</span>
                    {typeof event.amount === "number" && <span>{formatCurrency(event.amount)}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2.2rem] bg-black p-5 text-white shadow-[0_22px_60px_rgb(30_34_44/0.18)]">
            <p className="text-sm text-white/45">Calendar usage</p>
            <p className="mt-3 text-3xl font-semibold leading-tight">
              Follow-ups and invoice dates now live in a dedicated calendar view.
            </p>
            <Button asChild className="mt-6 rounded-full bg-white text-black hover:bg-white/88">
              <Link href="/dashboard/reports">Open reports</Link>
            </Button>
          </div>
        </aside>
      </section>
    </div>
  );
}
