import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { NewsletterForm } from "@/components/forms";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/data";

const proof = [
  { label: "Pakistan-wide installs", value: "2,500+" },
  { label: "Premium products", value: "44" },
  { label: "Support response", value: "24h" },
];

export default function HomePage() {
  return (
    <>
      <section className="container-page grid min-h-[calc(100vh-5rem)] items-center gap-10 py-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="eyebrow">Premium hydrotherapy for modern homes</p>
          <h1 className="display-title mt-5">Bring the spa experience home.</h1>
          <p className="body-lead mt-6 max-w-2xl">
            HOTSPRING Pakistan designs refined hot tub, spa, and wellness experiences for families, hotels, and private retreats that expect performance and calm.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/category" className="button-primary">
              Explore collection
              <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="button-secondary">Book consultation</Link>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {proof.map((item) => (
              <div key={item.label} className="glass-panel rounded-3xl p-4">
                <p className="text-2xl font-black text-[#171a1f]">{item.value}</p>
                <p className="mt-1 text-xs font-bold text-[#667085]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem] border border-black/5 bg-white shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1733653024328-9d3f37fdfb73?w=1000&h=1250&fit=crop&auto=format&q=90"
              alt="Luxury hot tub installation"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-[1.5rem] bg-white/88 p-5 shadow-xl backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#0f766e]">Serenity Pro</p>
              <p className="mt-1 text-2xl font-black text-[#171a1f]">Smart jets, LED mood, Wi-Fi control.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white/46">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Featured hot tubs</p>
              <h2 className="section-title mt-3">Engineered comfort, polished for daily living.</h2>
            </div>
            <Link href="/category" className="button-secondary">View all products</Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page section-pad grid gap-10 lg:grid-cols-[0.9fr_1fr]">
        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=1050&fit=crop&auto=format&q=85"
            alt="HOTSPRING showroom"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
        </div>
        <div className="self-center">
          <p className="eyebrow">About HOTSPRING</p>
          <h2 className="section-title mt-3">Built in Islamabad, designed for Pakistan.</h2>
          <p className="body-lead mt-5">
            From rooftop installations in Islamabad to resort wellness zones in the north, our team blends product expertise with careful project delivery.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              [ShieldCheck, "Warranty-backed"],
              [Truck, "Delivered nationwide"],
              [BadgeCheck, "Expert installation"],
            ].map(([Icon, label]) => {
              const FeatureIcon = Icon as typeof ShieldCheck;
              return (
                <div key={String(label)} className="rounded-3xl border border-black/5 bg-white p-5 text-sm font-black text-[#171a1f] shadow-sm">
                  <FeatureIcon className="mb-3 text-[#0f766e]" size={24} />
                  {label as string}
                </div>
              );
            })}
          </div>
          <Link href="/about" className="button-primary mt-8">Meet the team</Link>
        </div>
      </section>

      <section className="section-pad bg-[#171a1f] text-white">
        <div className="container-page">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#c29a4b]">Shop by category</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">Choose the setup that fits your space.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {categories.map((category) => (
              <Link key={category.title} href="/category" className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/5">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={category.image} alt={category.title} fill sizes="33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="text-2xl font-black">{category.title}</p>
                  <p className="mt-2 text-sm font-semibold text-white/58">{category.count} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page section-pad text-center">
        <Sparkles className="mx-auto text-[#c29a4b]" size={34} />
        <h2 className="section-title mx-auto mt-4 max-w-3xl">Stay close to new launches and wellness tips.</h2>
        <NewsletterForm />
      </section>
    </>
  );
}
