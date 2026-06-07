"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Building2,
  Mail,
  MoreHorizontal,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { deleteCustomer, getCustomers, isAuthExpiredError } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Customer, Status } from "@/types/crm";
import { CustomerAvatar } from "@/components/customers/customer-avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const statuses = ["All", "Lead", "Active", "Inactive"] as const;

const statusStyles: Record<Status, string> = {
  Lead: "bg-[#fff1b8] text-[#7c5600]",
  Active: "bg-[#d4f8e8] text-[#087a48]",
  Inactive: "bg-[#e5e9ee] text-black/50",
};

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
    <div className="soft-crm-card rounded-[1.8rem] border premium-border p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="grid size-10 place-items-center rounded-full bg-white">
          <Icon className="size-4 text-black/58" />
        </div>
        <ArrowUpRight className="size-4 text-black/35" />
      </div>
      <p className="text-sm text-black/48">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-xs text-black/40">{helper}</p>
    </div>
  );
}

export function CustomerList() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<Customer | null>(null);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await getCustomers({ search });
      setCustomers(response.data);
    } catch (error) {
      if (isAuthExpiredError(error)) return;
      toast.error(error instanceof Error ? error.message : "Could not fetch customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(fetchCustomers, 250);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const filteredCustomers = useMemo(
    () => customers.filter((customer) => status === "All" || customer.status === status),
    [customers, status],
  );

  const counts = useMemo(
    () => ({
      All: customers.length,
      Lead: customers.filter((customer) => customer.status === "Lead").length,
      Active: customers.filter((customer) => customer.status === "Active").length,
      Inactive: customers.filter((customer) => customer.status === "Inactive").length,
    }),
    [customers],
  );

  const pipeline = useMemo(
    () => customers.reduce((total, customer) => total + customer.value, 0),
    [customers],
  );

  const sourceMix = useMemo(() => {
    const grouped = customers.reduce<Record<string, number>>((acc, customer) => {
      acc[customer.source] = (acc[customer.source] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  }, [customers]);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteCustomer(pendingDelete._id);
      toast.success(`${pendingDelete.name} deleted`);
      setPendingDelete(null);
      await fetchCustomers();
    } catch (error) {
      if (isAuthExpiredError(error)) return;
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Customer management</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Accounts and pipeline</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/48">
            Search, segment, edit, and delete all MongoDB customer records from one polished workspace.
          </p>
        </div>
        <Button asChild className="h-11 rounded-full bg-black px-5 text-white hover:bg-black/85">
          <Link href="/dashboard/customers/new">
            <Plus className="size-4" />
            Add customer
          </Link>
        </Button>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Total records" value={String(customers.length)} helper="Seeded CRM contacts" icon={Users} />
        <StatTile label="Active accounts" value={String(counts.Active)} helper="In service right now" icon={TrendingUp} />
        <StatTile label="Pipeline" value={formatCurrency(pipeline)} helper="Estimated opportunity" icon={Building2} />
        <StatTile label="Lead queue" value={String(counts.Lead)} helper="Needs qualification" icon={Mail} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <Card className="soft-crm-card overflow-hidden rounded-[2.2rem] border premium-border">
          <CardContent className="p-0">
            <div className="flex flex-col gap-4 border-b premium-border p-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Customer records</h2>
                <p className="mt-1 text-sm text-black/42">{filteredCustomers.length} records visible</p>
              </div>
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-black/35" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by name, company, or email"
                  className="h-11 rounded-full border-black/10 bg-white pl-11"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 p-5">
              <Tabs value={status} onValueChange={(value) => setStatus(value as (typeof statuses)[number])}>
                <TabsList className="grid h-auto w-full grid-cols-2 gap-1 rounded-full bg-[#e8ebef] p-1 md:w-fit md:grid-cols-4">
                  {statuses.map((item) => (
                    <TabsTrigger key={item} value={item} className="rounded-full px-4 data-[state=active]:bg-white">
                      {item}
                      <span className="ml-2 rounded-full bg-black/7 px-2 py-0.5 text-xs">
                        {counts[item]}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Skeleton key={item} className="h-16 rounded-2xl" />
                  ))}
                </div>
              ) : (
                <div className="overflow-hidden rounded-[1.6rem] border premium-border bg-white">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Value</TableHead>
                        <TableHead className="hidden lg:table-cell">Last contacted</TableHead>
                        <TableHead className="hidden xl:table-cell">Source</TableHead>
                        <TableHead className="w-10" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.map((customer) => (
                        <TableRow key={customer._id} className="hover:bg-[#f6f7f8]">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <CustomerAvatar name={customer.name} className="size-11" />
                              <div>
                                <p className="font-semibold">{customer.name}</p>
                                <p className="text-sm text-black/42">{customer.company}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusStyles[customer.status]}>
                              {customer.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden font-medium md:table-cell">{formatCurrency(customer.value)}</TableCell>
                          <TableCell className="hidden text-black/54 lg:table-cell">{formatDate(customer.lastContacted)}</TableCell>
                          <TableCell className="hidden xl:table-cell">{customer.source}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="icon-sm" variant="ghost" aria-label={`Actions for ${customer.name}`}>
                                  <MoreHorizontal className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => router.push(`/dashboard/customers/${customer._id}/edit`)}>
                                  <Pencil className="size-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setPendingDelete(customer)} className="text-destructive">
                                  <Trash2 className="size-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredCustomers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="h-32 text-center text-black/45">
                            No customers match your filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <aside className="soft-crm-card rounded-[2.2rem] border premium-border p-5">
          <div className="mb-5">
            <p className="text-sm text-black/42">Source mix</p>
            <h2 className="text-2xl font-semibold">Acquisition view</h2>
          </div>
          <div className="space-y-3">
            {sourceMix.map(([source, count]) => (
              <div key={source} className="rounded-[1.4rem] bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{source}</p>
                  <span className="text-sm text-black/42">{count}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-[#eceff3]">
                  <div
                    className="h-full rounded-full bg-black"
                    style={{ width: `${Math.max(12, (count / Math.max(customers.length, 1)) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button asChild variant="outline" className="h-11 rounded-full bg-white">
              <Link href="/dashboard/reports">Reports</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-full bg-white">
              <Link href="/dashboard/invoices">
                <Phone className="size-4" />
                Invoice
              </Link>
            </Button>
          </div>
        </aside>
      </section>

      <AlertDialog open={Boolean(pendingDelete)} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete customer?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes {pendingDelete?.name} from MongoDB. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
