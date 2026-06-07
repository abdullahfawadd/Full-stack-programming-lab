import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const journey = [
  ["Allocate case", "Acknowledge receipt"],
  ["Identify issue", "Assign owner", "Set priority"],
  ["Resolution plan", "Invoice customer"],
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#d7dade] text-[#151820]">
      <section className="relative min-h-[92vh] overflow-hidden px-5 py-6 md:px-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/0.42),transparent_48%)]" />

        <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-black text-white shadow-xl shadow-black/10">
              <Sparkles className="size-5" />
            </span>
            <span className="text-xl font-semibold tracking-tight">
              Vantage<span className="text-black/42">crm</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-black/55 md:flex">
            <a href="#features" className="transition hover:text-black">Features</a>
            <a href="#workflow" className="transition hover:text-black">Workflow</a>
            <Link href="/login" className="transition hover:text-black">Login</Link>
          </nav>
          <Button asChild className="rounded-full bg-black px-5 text-white hover:bg-black/85">
            <Link href="/login">
              Open CRM
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </header>

        <div className="relative z-10 mx-auto grid min-h-[calc(92vh-72px)] max-w-7xl items-center gap-10 pt-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm uppercase tracking-[0.32em] text-black/50">
              Final Term MERN + Next.js CRM
            </p>
            <h1 className="text-6xl font-semibold leading-[0.94] tracking-tight md:text-8xl">
              Customer work, redesigned.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-black/58">
              Vantage CRM brings customers, status, invoices, and a no-API rule assistant into a polished product interface backed by MongoDB.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-full bg-black px-6 text-white hover:bg-black/85">
                <Link href="/login">
                  Launch dashboard
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-black/15 bg-white/60 px-6">
                <Link href="/register">Create workspace</Link>
              </Button>
            </div>
          </div>

          <div className="relative min-h-[560px]">
            <div className="absolute inset-x-0 top-6 mx-auto h-[520px] max-w-[820px] rotate-[-4deg] rounded-[2.4rem] bg-black p-3 shadow-[0_55px_110px_rgb(35_38_45/0.32)]">
              <div className="h-full overflow-hidden rounded-[1.9rem] bg-[#f3f4f5] p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-2xl bg-black text-white">
                      <Sparkles className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs text-black/45">sugarcrm inspired flow</p>
                      <h2 className="text-2xl font-semibold">Customer Journeys</h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm shadow-sm">
                    <Image src="/picture_abd.png" alt="M Abdullah" width={32} height={32} className="size-8 rounded-full object-cover" />
                    Abdullah
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-5">
                  {journey.map((column, index) => (
                    <div key={index} className="rounded-[2rem] bg-[#e6e9ee] p-4">
                      <div className="mb-4 flex justify-end gap-2">
                        <button className="grid size-9 place-items-center rounded-full bg-white shadow-sm">
                          <CalendarDays className="size-4" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        {column.map((item, itemIndex) => (
                          <div key={item} className="rounded-[1.35rem] bg-white p-4 shadow-[0_12px_30px_rgb(50_56_68/0.08)]">
                            <div className="mb-4 flex items-center justify-between">
                              <Image src="/picture_abd.png" alt="M Abdullah" width={36} height={36} className="size-9 rounded-full object-cover" />
                              {itemIndex % 2 === 0 ? <CheckCircle2 className="size-4 text-emerald-500" /> : <CircleDot className="size-4 text-[#8b79ff]" />}
                            </div>
                            <p className="text-sm font-semibold leading-snug">{item}</p>
                            <p className="mt-2 text-xs text-black/42">CRM operations</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-4">
                  {[
                    ["15", "Customer records", Users],
                    ["3", "Status segments", CircleDot],
                    ["PDF", "Invoice exports", BadgeDollarSign],
                  ].map(([value, label, Icon]) => (
                    <div key={label as string} className="rounded-[1.5rem] bg-white p-4 shadow-sm">
                      <Icon className="mb-4 size-5 text-black/45" />
                      <p className="text-2xl font-semibold">{value as string}</p>
                      <p className="text-xs text-black/45">{label as string}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto grid max-w-7xl gap-5 px-5 pb-20 md:grid-cols-3 md:px-10">
        {[
          "JWT protected dashboard routes",
          "MongoDB customer CRUD with search and filters",
          "Invoice generation with downloadable PDF",
        ].map((feature) => (
          <div key={feature} className="rounded-[2rem] bg-white/70 p-7 shadow-[0_22px_60px_rgb(50_56_68/0.1)]">
            <CheckCircle2 className="mb-8 size-6 text-emerald-500" />
            <p className="text-xl font-semibold leading-snug">{feature}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
