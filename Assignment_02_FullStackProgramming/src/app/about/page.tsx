import Image from "next/image";
import Link from "next/link";
import { Award, HeartHandshake, Lightbulb, Shield } from "lucide-react";
import { teamMembers } from "@/lib/data";

const values = [
  { icon: Award, title: "Premium craft", body: "We specify durable shells, efficient heating, and refined finishes for long-term ownership." },
  { icon: HeartHandshake, title: "Service first", body: "Consultation, delivery, and after-sales support stay human, responsive, and transparent." },
  { icon: Lightbulb, title: "Smart wellness", body: "Our technology roadmap connects better controls, scheduling, and service diagnostics." },
  { icon: Shield, title: "Trust by design", body: "Every project is planned with clear timelines, warranty support, and careful installation." },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-page section-pad grid gap-10 lg:grid-cols-[0.9fr_1fr]">
        <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=1100&fit=crop&auto=format&q=85"
            alt="HOTSPRING design studio"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
        </div>
        <div className="self-center">
          <p className="eyebrow">About us</p>
          <h1 className="display-title mt-4">Built in Islamabad, designed for Pakistan.</h1>
          <p className="body-lead mt-6">
            HOTSPRING was founded with a clear purpose: bring world-class wellness solutions to Pakistani homes, rooftops, farmhouses, and hospitality spaces with a calmer, more professional buying experience.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              ["2,500+", "Customers"],
              ["44", "Products"],
              ["12", "Cities"],
            ].map(([value, label]) => (
              <div key={label} className="glass-panel rounded-3xl p-4">
                <p className="text-2xl font-black text-[#171a1f]">{value}</p>
                <p className="mt-1 text-xs font-bold text-[#667085]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-white/48">
        <div className="container-page">
          <p className="eyebrow">Core values</p>
          <h2 className="section-title mt-3 max-w-3xl">Professional service around every product decision.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article key={value.title} className="glass-panel rounded-[1.5rem] p-6">
                <value.icon className="text-[#0f766e]" size={28} />
                <h3 className="mt-5 text-xl font-black text-[#171a1f]">{value.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#667085]">{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page section-pad">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Meet our team</p>
            <h2 className="section-title mt-3">People behind the experience.</h2>
          </div>
          <Link href="/contact" className="button-primary">Talk to us</Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {teamMembers.map((member) => (
            <article key={member.name} className="card-hover rounded-[1.5rem] border border-black/5 bg-white p-6 shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#171a1f] text-xl font-black text-white">
                {member.name.split(" ").slice(0, 2).map((part) => part[0]).join("")}
              </div>
              <h3 className="mt-6 text-2xl font-black text-[#171a1f]">{member.name}</h3>
              <p className="mt-1 text-sm font-black uppercase tracking-[0.14em] text-[#0f766e]">{member.role}</p>
              <p className="mt-4 text-sm leading-7 text-[#667085]">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
