import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductShowcase } from "@/components/ProductShowcase";

export default function Home() {
  return (
    <main>
      <section className="relative min-h-[74svh] overflow-hidden bg-foreground text-white">
        <Image
          src="/products/hero-room.jpg"
          alt="Editorial living space with warm plant styling"
          fill
          sizes="100vw"
          className="object-cover opacity-78"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/42 to-black/5" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />

        <div className="shell relative flex min-h-[74svh] items-end pb-12 pt-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur">
              <Leaf size={16} />
              Rustik Studio 2026
            </div>
            <h1 className="mt-6 text-5xl font-semibold leading-[0.98] md:text-8xl">
              Sculptural plant goods for lived-in spaces.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              Curated planters, care tools, and tactile home objects, powered
              by a fresh MongoDB product catalog and a complete MERN storefront.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="focus-ring inline-flex h-12 items-center gap-2 rounded-lg bg-background px-5 text-sm font-semibold text-foreground"
              >
                Shop collection
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/admin"
                className="focus-ring inline-flex h-12 items-center gap-2 rounded-lg border border-white/30 px-5 text-sm font-semibold text-white"
              >
                Manage products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="shell -mt-6 grid gap-3 rounded-lg border border-line bg-surface p-3 shadow-2xl md:grid-cols-4">
        {[
          ["01", "Planters", "Matte ceramic forms"],
          ["02", "Care", "Daily plant rituals"],
          ["03", "Decor", "Shelf-ready objects"],
          ["04", "Admin", "Live MongoDB CRUD"],
        ].map(([number, title, copy]) => (
          <div key={title} className="rounded-md bg-background p-4">
            <p className="font-mono text-xs text-sage-dark">{number}</p>
            <h2 className="mt-3 text-lg font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-ink-soft">{copy}</p>
          </div>
        ))}
      </section>

      <section className="shell py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-sage-dark">
              <Sparkles size={16} />
              Featured pieces
            </p>
            <h2 className="mt-3 text-4xl font-semibold md:text-6xl">
              The objects that make the room.
            </h2>
          </div>
          <Link
            href="/shop"
            className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>
        <ProductShowcase featuredOnly />
      </section>

      <section className="shell grid gap-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-medium text-sage-dark">Built by M Abdullah</p>
          <h2 className="mt-3 text-4xl font-semibold md:text-6xl">
            Complete store flow, not a static mockup.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
            The interface connects to a dedicated Express API, pulls products
            from MongoDB, and keeps shopping actions smooth across desktop,
            tablet, and mobile screens.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["API", "http://localhost:5000/api/products"],
            ["Database", "lab12_dynamic_ecommerce"],
            ["Collection", "products"],
            ["Frontend", "http://localhost:3000"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-line bg-surface p-6"
            >
              <p className="text-sm text-ink-soft">{label}</p>
              <p className="mt-2 break-words font-mono text-sm">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
