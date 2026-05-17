"use client";

import { CheckCircle2, CreditCard } from "lucide-react";
import { FormEvent, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";

export function CheckoutForm() {
  const { clearCart, items, subtotal } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const shipping = items.length > 0 ? 12 : 0;
  const total = subtotal + shipping;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <main className="shell py-16">
        <div className="rounded-lg border border-line bg-surface p-10 text-center">
          <CheckCircle2 className="mx-auto text-sage-dark" size={44} />
          <h1 className="mt-5 text-4xl font-semibold">Order placed.</h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">
            Your demo checkout is complete. The cart has been cleared and the UI
            is ready for a new order.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="shell py-12">
      <p className="text-sm font-medium text-sage-dark">Checkout</p>
      <h1 className="mt-3 text-4xl font-semibold md:text-6xl">
        Finish with a clean flow.
      </h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-line bg-surface p-5 md:p-8"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Full name", "text", "M Abdullah"],
              ["Email", "email", "abdullah@example.com"],
              ["Phone", "tel", "+92 300 0000000"],
              ["City", "text", "Islamabad"],
            ].map(([label, type, placeholder]) => (
              <label key={label} className="grid gap-2 text-sm font-medium">
                {label}
                <input
                  required
                  type={type}
                  placeholder={placeholder}
                  className="focus-ring h-11 rounded-lg border border-line bg-background px-3 text-sm font-normal"
                />
              </label>
            ))}
          </div>

          <label className="mt-4 grid gap-2 text-sm font-medium">
            Address
            <textarea
              required
              rows={4}
              placeholder="House, street, sector, delivery note"
              className="focus-ring resize-none rounded-lg border border-line bg-background px-3 py-3 text-sm font-normal"
            />
          </label>

          <div className="mt-6 rounded-lg border border-line bg-background p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <CreditCard size={18} />
              Payment method
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["Cash", "Card", "Bank"].map((method, index) => (
                <label
                  key={method}
                  className="flex items-center gap-2 rounded-lg border border-line bg-surface p-3 text-sm"
                >
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked={index === 0}
                    className="accent-sage"
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={items.length === 0}
            className="focus-ring mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-foreground px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-ink-soft"
          >
            Place order
          </button>
        </form>

        <aside className="h-fit rounded-lg border border-line bg-surface p-5">
          <h2 className="text-xl font-semibold">Summary</h2>
          <div className="mt-5 grid gap-3">
            {items.map((item) => (
              <div key={item._id} className="flex justify-between gap-4 text-sm">
                <span className="text-ink-soft">
                  {item.name} x {item.quantity}
                </span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-3 border-t border-line pt-4 text-sm text-ink-soft">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-semibold text-foreground">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
