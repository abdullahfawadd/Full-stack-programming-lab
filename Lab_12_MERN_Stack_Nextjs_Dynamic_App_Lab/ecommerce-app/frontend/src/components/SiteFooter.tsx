import { Leaf } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="shell grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-white">
              <Leaf size={19} />
            </span>
            <div>
              <p className="font-semibold">Rustik Studio</p>
              <p className="text-sm text-ink-soft">Lab 12 by M Abdullah</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-ink-soft">
            A dynamic MERN ecommerce storefront using Next.js, Tailwind CSS,
            Express, MongoDB, and a fresh Lab 12 product database.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold">Pages</p>
          <div className="mt-4 grid gap-2 text-sm text-ink-soft">
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/admin">Admin</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold">Database</p>
          <p className="mt-4 font-mono text-xs leading-6 text-ink-soft">
            lab12_dynamic_ecommerce
            <br />
            products
          </p>
        </div>
      </div>
    </footer>
  );
}
