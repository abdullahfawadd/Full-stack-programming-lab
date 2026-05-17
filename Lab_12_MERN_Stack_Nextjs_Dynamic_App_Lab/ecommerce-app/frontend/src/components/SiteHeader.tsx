"use client";

import { Leaf, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/90 backdrop-blur-xl">
      <div className="shell flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 focus-ring rounded-lg">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-white">
            <Leaf size={20} />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-semibold">M Abdullah</span>
            <span className="block text-xs text-ink-soft">Rustik Studio</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-lg border border-line bg-surface p-1 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-foreground text-white"
                    : "text-ink-soft hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/cart"
          className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm font-medium transition hover:border-foreground"
          aria-label={`Cart with ${itemCount} items`}
        >
          <ShoppingBag size={18} />
          <span className="hidden sm:inline">Cart</span>
          <span className="rounded-md bg-foreground px-2 py-0.5 text-xs text-white">
            {itemCount}
          </span>
        </Link>
      </div>

      <nav className="shell flex gap-1 overflow-x-auto pb-3 md:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`shrink-0 rounded-lg px-3 py-2 text-sm ${
              pathname === link.href
                ? "bg-foreground text-white"
                : "bg-surface text-ink-soft"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
