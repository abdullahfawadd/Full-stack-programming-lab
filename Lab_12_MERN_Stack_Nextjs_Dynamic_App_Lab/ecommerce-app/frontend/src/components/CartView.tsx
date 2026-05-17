"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";

export function CartView() {
  const { items, removeItem, subtotal, updateQuantity } = useCart();
  const shipping = items.length > 0 ? 12 : 0;
  const total = subtotal + shipping;

  return (
    <main className="shell py-12">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-sage-dark">Cart</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-6xl">
            Your selected pieces.
          </h1>
        </div>
        <Link
          href="/shop"
          className="focus-ring inline-flex rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium"
        >
          Continue shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-lg border border-line bg-surface p-10 text-ink-soft">
          Your cart is empty.
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="grid gap-4">
            {items.map((item) => (
              <article
                key={item._id}
                className="grid gap-4 rounded-lg border border-line bg-surface p-4 sm:grid-cols-[132px_1fr_auto]"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm text-sage-dark">{item.category}</p>
                  <h2 className="mt-1 text-xl font-semibold">{item.name}</h2>
                  <p className="mt-3 text-ink-soft">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:justify-between">
                  <div className="inline-flex items-center rounded-lg border border-line">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="focus-ring flex h-10 w-10 items-center justify-center"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-10 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="focus-ring flex h-10 w-10 items-center justify-center"
                      aria-label="Increase quantity"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item._id)}
                    className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink-soft hover:text-foreground"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded-lg border border-line bg-surface p-5">
            <h2 className="text-xl font-semibold">Order summary</h2>
            <div className="mt-5 grid gap-3 text-sm text-ink-soft">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatCurrency(shipping)}</span>
              </div>
              <div className="border-t border-line pt-3 text-base font-semibold text-foreground">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
            <Link
              href="/checkout"
              className="focus-ring mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-foreground px-4 text-sm font-semibold text-white"
            >
              Checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
