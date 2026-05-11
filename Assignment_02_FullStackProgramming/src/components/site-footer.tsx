import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { NewsletterForm } from "@/components/forms";

const links = [
  { href: "/category", label: "Shop hot tubs" },
  { href: "/shopping/cart", label: "Shopping cart" },
  { href: "/shopping/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-[#171a1f] text-white">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-black text-[#171a1f]">
              HS
            </span>
            <div>
              <p className="font-black tracking-wide">HOTSPRING Pakistan</p>
              <p className="text-sm text-white/58">Premium hot tubs and wellness systems.</p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/66">
            Built for modern Pakistani homes, hospitality spaces, and private wellness rooms with polished service from discovery to installation.
          </p>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-white/42">Explore</p>
          <div className="mt-4 grid gap-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-white/70 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-white/42">Stay in the loop</p>
          <div className="mt-4">
            <NewsletterForm compact />
          </div>
          <div className="mt-6 grid gap-2 text-sm text-white/66">
            <span className="flex items-center gap-2">
              <MapPin size={16} /> Islamabad, Pakistan
            </span>
            <span className="flex items-center gap-2">
              <Phone size={16} /> +92 300 1234567
            </span>
            <span className="flex items-center gap-2">
              <Mail size={16} /> hello@hotspring.pk
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
