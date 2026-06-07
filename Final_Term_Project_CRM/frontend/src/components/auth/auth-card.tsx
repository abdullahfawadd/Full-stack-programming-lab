"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Eye,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { login, register } from "@/lib/api";
import { demoCredentials, operatorProfile } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type AuthMode = "login" | "register";

const journeyColumns = [
  {
    title: "Lead Intake",
    cards: ["Qualify inbound request", "Assign relationship owner"],
  },
  {
    title: "Account Work",
    cards: ["Prepare proposal", "Track customer status", "Schedule follow-up"],
  },
  {
    title: "Billing",
    cards: ["Generate PDF invoice", "Send payment summary"],
  },
];

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-11 place-items-center rounded-2xl bg-white text-[#2b2440] shadow-[0_14px_30px_rgb(0_0_0/0.2)]">
        <Sparkles className="size-5" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.32em] text-white/48">Vantage</p>
        <h1 className="text-xl font-semibold tracking-tight text-white">CRM</h1>
      </div>
    </div>
  );
}

export function AuthCard({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("M Abdullah");
  const [email, setEmail] = useState(demoCredentials.email);
  const [password, setPassword] = useState(demoCredentials.password);
  const [loading, setLoading] = useState(false);
  const isLogin = mode === "login";

  const authenticate = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        toast.success("Welcome back, Abdullah");
      } else {
        await register(name, email, password);
        toast.success("Workspace created successfully");
      }

      router.replace(searchParams.get("next") || "/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void authenticate();
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#706a7d] px-4 py-8 text-white md:px-8">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(120deg,rgb(255_255_255/0.12),transparent_42%,rgb(35_28_50/0.18))]" />

      <motion.section
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl overflow-hidden rounded-[2rem] bg-[#241f31] p-3 shadow-[0_40px_110px_rgb(18_16_28/0.45)] lg:grid-cols-[1.18fr_0.82fr]"
      >
        <section className="relative hidden overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#5d51a6] p-7 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_8%,rgb(255_255_255/0.22),transparent_28%),linear-gradient(180deg,rgb(106_90_190/0.96),rgb(29_24_42/0.98))]" />
          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center justify-between">
              <BrandMark />
              <div className="rounded-full bg-white/14 px-4 py-2 text-sm text-white/82 backdrop-blur">
                CRM case workspace <ArrowRight className="ml-1 inline size-4" />
              </div>
            </div>

            <div className="relative mt-10 flex-1 rounded-[1.5rem] border border-white/12 bg-white/[0.09] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/58">Customer Journeys</p>
                  <h2 className="text-3xl font-semibold tracking-tight">Case management flow</h2>
                </div>
                <div className="flex -space-x-3">
                  {[operatorProfile.image, operatorProfile.image, operatorProfile.image].map((src, index) => (
                    <Image
                      key={`${src}-${index}`}
                      src={src}
                      alt="Team avatar"
                      width={42}
                      height={42}
                      className="size-10 rounded-full border-2 border-[#5d51a6] object-cover"
                    />
                  ))}
                </div>
              </div>

              <div className="grid h-[440px] grid-cols-3 gap-5">
                {journeyColumns.map((column, columnIndex) => (
                  <div key={column.title} className="relative flex flex-col gap-4">
                    <p className="text-center text-sm text-white/72">{column.title}</p>
                    {column.cards.map((card, cardIndex) => (
                      <motion.div
                        key={card}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + columnIndex * 0.08 + cardIndex * 0.05 }}
                        className="rounded-[1.4rem] bg-white/92 p-4 text-[#22202b] shadow-[0_18px_35px_rgb(13_10_24/0.18)]"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <Image
                            src={operatorProfile.image}
                            alt="M Abdullah"
                            width={38}
                            height={38}
                            className="size-9 rounded-full object-cover"
                          />
                          <span className="rounded-full border border-black/10 px-2 py-1 text-xs text-black/50">
                            0{columnIndex + cardIndex + 1}
                          </span>
                        </div>
                        <p className="text-sm font-semibold leading-snug">{card}</p>
                        <div className="mt-4 h-1.5 rounded-full bg-black/8">
                          <div className="h-full w-2/3 rounded-full bg-[#111]" />
                        </div>
                      </motion.div>
                    ))}
                    {columnIndex < journeyColumns.length - 1 && (
                      <div className="journey-line absolute left-[calc(100%+0.35rem)] top-1/2 h-px w-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-6 flex items-end justify-between">
              <div>
                <p className="text-4xl font-semibold leading-tight tracking-tight">
                  Manage customers.
                  <br />
                  Ship invoices.
                </p>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/60">
                  A final project CRM that feels like a designed product, not a generated admin template.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="h-1.5 w-9 rounded-full bg-white/35" />
                <span className="h-1.5 w-9 rounded-full bg-white" />
                <span className="h-1.5 w-9 rounded-full bg-white/35" />
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-10 sm:px-8">
          <Card className="w-full max-w-lg border-0 bg-transparent text-white shadow-none">
            <CardContent className="p-0">
              <div className="mb-9 lg:hidden">
                <BrandMark />
              </div>
              <div className="mb-9">
                <p className="mb-3 text-sm text-[#a894ff]">Secure CRM workspace</p>
                <h2 className="text-5xl font-semibold tracking-tight">
                  {isLogin ? "Welcome back" : "Create an account"}
                </h2>
                <p className="mt-4 text-base text-white/55">
                  {isLogin ? "New here?" : "Already have an account?"}{" "}
                  <Link
                    className="text-white underline underline-offset-4"
                    href={isLogin ? "/register" : "/login"}
                  >
                    {isLogin ? "Create account" : "Log in"}
                  </Link>
                </p>
              </div>

              <form className="space-y-4" onSubmit={onSubmit}>
                {!isLogin && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-white/72" htmlFor="name">First name</Label>
                      <div className="relative">
                        <UserRound className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/45" />
                        <Input id="name" value={name} onChange={(event) => setName(event.target.value)} className="auth-input pl-11" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/72" htmlFor="role">Role</Label>
                      <Input id="role" value="CRM Lead" readOnly className="auth-input" />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label className="text-white/72" htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/45" />
                    <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="auth-input pl-11" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white/72" htmlFor="password">Password</Label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/45" />
                    <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="auth-input pl-11 pr-11" required minLength={8} />
                    <Eye className="absolute right-4 top-1/2 size-4 -translate-y-1/2 text-white/35" />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1 text-sm text-white/64">
                  <span className="grid size-5 place-items-center rounded-md bg-white text-[#241f31]">
                    <BadgeCheck className="size-4" />
                  </span>
                  JWT cookie auth, local MongoDB, no external AI chatbot.
                </div>

                <Button
                  className="mt-3 h-[52px] w-full rounded-xl bg-[#7c5cff] text-base text-white shadow-[0_18px_40px_rgb(124_92_255/0.32)] hover:bg-[#8b72ff]"
                  type="button"
                  onClick={() => void authenticate()}
                  disabled={loading}
                >
                  {loading ? "Securing session..." : isLogin ? "Enter dashboard" : "Create account"}
                  <ArrowRight className="size-4" />
                </Button>
              </form>

              <Separator className="my-8 bg-white/12" />
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-center text-sm text-white/68">
                  15 CRM records
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-center text-sm text-white/68">
                  PDF invoices
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </motion.section>
    </main>
  );
}
