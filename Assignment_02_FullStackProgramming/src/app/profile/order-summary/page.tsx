import Link from "next/link";
import { formatCurrency, orderHistory } from "@/lib/data";

export const metadata = {
  title: "My Orders",
};

export default function OrderSummaryPage() {
  return (
    <section className="container-page section-pad">
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Orders</p>
          <h1 className="section-title mt-3">My orders.</h1>
        </div>
        <Link href="/my-account" className="button-secondary">Back to account</Link>
      </div>
      <div className="grid gap-4">
        {orderHistory.map((order) => (
          <article key={order.id} className="glass-panel rounded-[1.5rem] p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <h2 className="text-2xl font-black text-[#171a1f]">{order.id}</h2>
                <p className="mt-1 text-sm font-semibold text-[#667085]">{order.date}</p>
                <p className="mt-4 text-sm font-semibold text-[#667085]">{order.items.join(", ")}</p>
              </div>
              <div className="text-left md:text-right">
                <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-black text-[#0b4f4a]">{order.status}</span>
                <p className="mt-4 text-xl font-black text-[#171a1f]">{formatCurrency(order.total)}</p>
                <Link href="/profile/order-details" className="button-secondary mt-4 min-h-10 px-4 text-sm">View details</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
