"use client";

import Link from "next/link";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/category", label: "Shop" },
  { href: "/product-detail", label: "Product" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#fbfaf7]/88 backdrop-blur-2xl">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#171a1f] text-sm font-black text-white">
            HS
          </span>
          <span className="leading-tight">
            <span className="block text-base font-black tracking-wide text-[#171a1f]">HOTSPRING</span>
            <span className="block text-xs font-semibold text-[#667085]">Pakistan Wellness</span>
          </span>
        </Link>

        <nav className="hidden items-center rounded-full border border-black/5 bg-white/70 p-1 shadow-sm lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-bold text-[#4a525d] hover:bg-[#f1ede4] hover:text-[#0b4f4a]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Link className="button-secondary h-11 min-h-0 w-11 px-0" href="/category" aria-label="Search products">
            <Search size={18} />
          </Link>
          <Link className="button-secondary h-11 min-h-0 w-11 px-0" href="/my-account" aria-label="My account">
            <UserRound size={18} />
          </Link>
          <Link className="button-primary h-11 min-h-0 px-4" href="/shopping/cart">
            <ShoppingBag size={18} />
            Cart
          </Link>
        </div>

        <button
          type="button"
          className="button-secondary h-11 min-h-0 w-11 px-0 lg:hidden"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-black/5 bg-[#fbfaf7] lg:hidden">
          <div className="container-page grid gap-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-bold text-[#303640] hover:bg-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link className="button-secondary" href="/my-account" onClick={() => setOpen(false)}>
                <UserRound size={18} />
                Account
              </Link>
              <Link className="button-primary" href="/shopping/cart" onClick={() => setOpen(false)}>
                <ShoppingBag size={18} />
                Cart
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
