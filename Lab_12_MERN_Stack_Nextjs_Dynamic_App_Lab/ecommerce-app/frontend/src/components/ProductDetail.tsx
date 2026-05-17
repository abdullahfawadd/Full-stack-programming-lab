"use client";

import { Minus, Plus, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/lib/api";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types/product";

export function ProductDetail({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProductById(productId);
        setProduct(data);
        setActiveImage(data.image);
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Product could not be loaded.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const images = useMemo(
    () => (product ? [product.image, ...product.gallery] : []),
    [product],
  );

  if (isLoading) {
    return (
      <main className="shell grid gap-10 py-12 lg:grid-cols-2">
        <div className="h-[560px] animate-pulse rounded-lg bg-muted" />
        <div className="h-[560px] animate-pulse rounded-lg bg-surface" />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="shell py-16">
        <div className="rounded-lg border border-line bg-surface p-8">
          <p className="text-ink-soft">{error || "Product not found."}</p>
          <Link
            href="/shop"
            className="focus-ring mt-5 inline-flex rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-white"
          >
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="shell grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
      <section>
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted soft-shadow">
          <Image
            src={activeImage}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((image) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveImage(image)}
              className={`focus-ring relative aspect-square overflow-hidden rounded-lg border ${
                activeImage === image ? "border-foreground" : "border-line"
              }`}
            >
              <Image src={image} alt="" fill sizes="25vw" className="object-cover" />
            </button>
          ))}
        </div>
      </section>

      <section className="lg:sticky lg:top-28 lg:self-start">
        <p className="text-sm font-medium text-sage-dark">{product.category}</p>
        <h1 className="mt-3 text-4xl font-semibold md:text-6xl">
          {product.name}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
          {product.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <p className="text-3xl font-semibold">{formatCurrency(product.price)}</p>
          {product.oldPrice ? (
            <p className="text-lg text-ink-soft line-through">
              {formatCurrency(product.oldPrice)}
            </p>
          ) : null}
          <span className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm">
            <Star size={16} fill="currentColor" />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <div className="inline-flex items-center rounded-lg border border-line bg-surface">
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="focus-ring flex h-12 w-12 items-center justify-center"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="w-12 text-center text-sm font-semibold">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() =>
                setQuantity((value) => Math.min(product.stock, value + 1))
              }
              className="focus-ring flex h-12 w-12 items-center justify-center"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => addItem(product, quantity)}
            className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-foreground px-6 text-sm font-semibold text-white"
          >
            <ShoppingBag size={18} />
            Add to cart
          </button>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            ["Material", product.material],
            ["Size", product.dimensions],
            ["Care", product.care],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-line bg-surface p-4">
              <p className="text-xs font-medium text-sage-dark">{label}</p>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <p className="text-sm font-semibold">Product details</p>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-ink-soft">
            {product.details.map((detail) => (
              <li key={detail} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
