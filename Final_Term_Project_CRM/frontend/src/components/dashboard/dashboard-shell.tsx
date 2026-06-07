"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BadgeDollarSign,
  BarChart3,
  Bell,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Share2,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { getMe, logout } from "@/lib/api";
import { initials } from "@/lib/format";
import { operatorProfile } from "@/lib/config";
import type { User } from "@/types/crm";
import { RuleChatbot } from "@/components/chatbot/rule-chatbot";
import { GlobalSearch } from "@/components/search/global-search";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/invoices", label: "Invoices", icon: BadgeDollarSign },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart3 },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [pinned, setPinned] = useState(false);
  const authExpiredHandled = useRef(false);

  useEffect(() => {
    const handleAuthExpired = (event: Event) => {
      if (authExpiredHandled.current) return;
      authExpiredHandled.current = true;
      const message = event instanceof CustomEvent ? event.detail : "Session expired";
      toast.error(message || "Session expired. Please login again.");
      router.replace("/login");
      router.refresh();
    };

    window.addEventListener("crm:auth-expired", handleAuthExpired);

    getMe()
      .then((response) => setUser(response.data))
      .catch((error) => {
        setUser(null);
        handleAuthExpired(
          new CustomEvent("crm:auth-expired", {
            detail: error instanceof Error ? error.message : "Session expired",
          }),
        );
      });

    return () => window.removeEventListener("crm:auth-expired", handleAuthExpired);
  }, [router]);

  const activeUser = user || operatorProfile;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Signed out");
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Logout failed");
    }
  };

  const copyPage = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Page link copied");
    } catch {
      toast.error("Could not copy link");
    }
  };

  const togglePinned = () => {
    setPinned((value) => !value);
    toast.success(pinned ? "Page unpinned" : "Page pinned");
  };

  const utilityControls = [
    { label: "Copy page link", icon: Share2, action: copyPage },
    { label: pinned ? "Unpin page" : "Pin page", icon: Star, action: togglePinned, active: pinned },
    { label: "Add customer", icon: Plus, href: "/dashboard/customers/new" },
    { label: "Calendar", icon: CalendarDays, href: "/dashboard/calendar", active: pathname.startsWith("/dashboard/calendar") },
  ];

  return (
    <div className="flex h-full flex-col items-center gap-4 py-5">
      <Link href="/dashboard" onClick={onNavigate} className="grid size-12 place-items-center rounded-2xl bg-black text-white shadow-xl shadow-black/10">
        <Sparkles className="size-5" />
      </Link>

      <div className="flex flex-1 flex-col items-center gap-3 rounded-full bg-white/75 p-2 shadow-[0_18px_55px_rgb(55_62_72/0.14)] backdrop-blur">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/dashboard"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-label={item.label}
                  className={`grid size-12 place-items-center rounded-full transition ${
                    active
                      ? "bg-black text-white shadow-lg shadow-black/15"
                      : "bg-[#eef0f3] text-black/58 hover:bg-white hover:text-black"
                  }`}
                >
                  <Icon className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          );
        })}
        <div className="my-1 h-px w-8 bg-black/10" />
        {utilityControls.map((control) => {
          const Icon = control.icon;
          const className = `grid size-12 place-items-center rounded-full transition ${
            control.active
              ? "bg-black text-white shadow-lg shadow-black/15"
              : "bg-[#eef0f3] text-black/50 hover:bg-white hover:text-black"
          }`;

          return (
            <Tooltip key={control.label}>
              <TooltipTrigger asChild>
                {control.href ? (
                  <Link
                    href={control.href}
                    onClick={onNavigate}
                    className={className}
                    aria-label={control.label}
                  >
                    <Icon className="size-5" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => void control.action?.()}
                    className={className}
                    aria-label={control.label}
                  >
                    <Icon className="size-5" />
                  </button>
                )}
              </TooltipTrigger>
              <TooltipContent side="right">{control.label}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      <div className="rounded-full bg-white/75 p-2 shadow-[0_18px_55px_rgb(55_62_72/0.14)]">
        <Avatar className="size-12 rounded-full">
          <AvatarImage src={operatorProfile.image} alt={activeUser.name} />
          <AvatarFallback>{initials(activeUser.name)}</AvatarFallback>
        </Avatar>
      </div>

      <Button size="icon-lg" variant="outline" className="rounded-full bg-white/80" onClick={handleLogout} aria-label="Logout">
        <LogOut className="size-4" />
      </Button>
    </div>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#d7dade] text-[#151820]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-24 lg:block">
        <SidebarContent />
      </aside>

      <div className="lg:pl-24">
        <header className="sticky top-0 z-30 mx-auto flex h-20 max-w-[1540px] items-center justify-between px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-4">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button size="icon-lg" variant="outline" className="rounded-full bg-white/80 lg:hidden" aria-label="Open menu">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-28 border-black/10 bg-[#d7dade] p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Vantage navigation</SheetTitle>
                </SheetHeader>
                <SidebarContent onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <Link href="/dashboard" className="text-xl font-semibold tracking-tight">
              Vantage<span className="text-black/42">crm</span>
            </Link>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-black/52 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-black">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <GlobalSearch />
            <Button size="icon-lg" variant="outline" className="rounded-full bg-white/80" aria-label="Notifications">
              <Bell className="size-4" />
            </Button>
            <Avatar className="size-11 rounded-full border-4 border-white shadow-lg">
              <AvatarImage src={operatorProfile.image} alt={operatorProfile.name} />
              <AvatarFallback>{initials(operatorProfile.name)}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="mx-auto max-w-[1540px] px-4 pb-10 md:px-8">{children}</main>
      </div>
      <RuleChatbot />
    </div>
  );
}
