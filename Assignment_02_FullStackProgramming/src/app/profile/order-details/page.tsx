import Link from "next/link";
import { CheckCircle2, Package, Truck } from "lucide-react";
import { formatCurrency, getProduct } from "@/lib/data";

export const metadata = {
  title: "Order Details",
};

export default function OrderDetailsPage() {
  const product = getProduct("serenity-pro-6-person");
  const items = [
    { name: product.name, qty: 1, price: product.price },
    { name: "Premium Spa Cover - Large", qty: 1, price: 57000 },
    { name: "Deluxe Spa Steps", qty: 1, price: 28500 },
  ];
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = 96500;

  return (
    <section className="container-page section-pad">
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Order details</p>
          <h1 className="section-title mt-3">Order HS-24091.</h1>
        </div>
        <Link href="/profile/order-summary" className="button-secondary">All orders</Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="glass-panel rounded-[1.7rem] p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [CheckCircle2, "Confirmed", "Order received"],
              [Package, "Processing", "Quality check active"],
              [Truck, "Delivery", "Install team scheduling"],
            ].map(([Icon, title, body]) => {
              const StepIcon = Icon as typeof CheckCircle2;
              return (
                <div key={String(title)} className="rounded-2xl bg-white p-4">
                  <StepIcon className="text-[#0f766e]" size={24} />
                  <p className="mt-3 font-black text-[#171a1f]">{title as string}</p>
                  <p className="text-sm font-semibold text-[#667085]">{body as string}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-7 grid gap-3">
            {items.map((item) => (
              <div key={item.name} className="flex items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white p-4">
                <div>
                  <p className="font-black text-[#171a1f]">{item.name}</p>
                  <p className="text-sm font-semibold text-[#667085]">Quantity {item.qty}</p>
                </div>
                <p className="font-black text-[#171a1f]">{formatCurrency(item.price * item.qty)}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="glass-panel h-fit rounded-[1.7rem] p-6">
          <h2 className="text-2xl font-black text-[#171a1f]">Summary</h2>
          <div className="mt-6 grid gap-3 text-sm font-semibold text-[#667085]">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
            <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
            <div className="flex justify-between border-t border-black/10 pt-4 text-xl font-black text-[#171a1f]">
              <span>Total</span>
              <span>{formatCurrency(subtotal + tax)}</span>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-white p-4 text-sm leading-6 text-[#667085]">
            Delivery to House 24, F-8 Markaz, Islamabad. Installation coordinator will call before dispatch.
          </div>
        </aside>
      </div>
    </section>
  );
}
