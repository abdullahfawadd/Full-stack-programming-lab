"use client";

import { ArrowLeft, CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getProductById } from "@/lib/productsApi";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatCurrency";
import { ErrorState } from "./states/ErrorState";

type ProductDetailsProps = {
  productId: string;
};

const highlights = [
  { icon: Truck, label: "Fast local delivery" },
  { icon: ShieldCheck, label: "Secure checkout ready" },
  { icon: CheckCircle2, label: "Verified MongoDB item" },
];

export function ProductDetails({ productId }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProduct = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProductById(productId);
      setProduct(data);
    } catch {
      setError("This product could not be loaded. Check the API server and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        <ArrowLeft size={16} />
        Back to catalog
      </Link>

      {isLoading && (
        <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-premium lg:grid-cols-2">
          <div className="aspect-[4/3] animate-pulse rounded-[1.5rem] bg-slate-200" />
          <div className="flex flex-col justify-center p-4">
            <div className="h-5 w-32 animate-pulse rounded-full bg-slate-200" />
            <div className="mt-5 h-12 w-4/5 animate-pulse rounded-xl bg-slate-200" />
            <div className="mt-4 h-5 w-full animate-pulse rounded-full bg-slate-200" />
            <div className="mt-3 h-5 w-3/4 animate-pulse rounded-full bg-slate-200" />
            <div className="mt-8 h-12 w-40 animate-pulse rounded-full bg-slate-200" />
          </div>
        </div>
      )}

      {!isLoading && error && <ErrorState message={error} onRetry={loadProduct} />}

      {!isLoading && !error && product && (
        <section className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-premium lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-mist">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col justify-center p-2 sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Product Details
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-lg leading-8 text-graphite">
              {product.description}
            </p>
            <p className="mt-6 text-4xl font-semibold tracking-tight text-ink">
              {formatCurrency(product.price)}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-cloud p-4"
                >
                  <Icon className="text-accent" size={22} />
                  <p className="mt-3 text-sm font-semibold text-ink">{label}</p>
                </div>
              ))}
            </div>

            <button className="mt-8 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
              Add to Cart
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
