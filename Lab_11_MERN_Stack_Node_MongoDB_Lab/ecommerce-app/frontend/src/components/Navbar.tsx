import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 glass-nav">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-white shadow-lg">
            <ShoppingBag size={21} />
          </span>
          <span>
            <span className="block text-lg font-semibold tracking-tight text-ink">
              Commerce Studio
            </span>
            <span className="block text-xs font-medium text-graphite">
              M Abdullah · 232052
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-graphite sm:flex">
          <Link className="transition hover:text-ink" href="/">
            Home
          </Link>
          <Link className="transition hover:text-ink" href="/#products">
            Products
          </Link>
          <a className="transition hover:text-ink" href="http://localhost:5000">
            API
          </a>
        </div>
      </nav>
    </header>
  );
}
