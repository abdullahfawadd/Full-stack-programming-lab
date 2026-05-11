import Link from "next/link";
import { CreditCard, MapPin, PackageCheck, Settings, ShoppingBag, UserRound } from "lucide-react";
import { formatCurrency, orderHistory } from "@/lib/data";

export const metadata = {
  title: "My Account",
};

const actions = [
  { href: "/profile/edit-account", icon: Settings, title: "Edit account", body: "Update profile details and password." },
  { href: "/edit-billing-address", icon: CreditCard, title: "Billing address", body: "Manage invoice and contact details." },
  { href: "/edit-shipping-address", icon: MapPin, title: "Shipping address", body: "Set preferred delivery location." },
  { href: "/profile/order-summary", icon: ShoppingBag, title: "Orders", body: "Review recent purchases and statuses." },
];

export default function MyAccountPage() {
  return (
    <section className="container-page section-pad">
      <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <aside className="glass-panel h-fit rounded-[1.7rem] p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#171a1f] text-white">
            <UserRound size={28} />
          </div>
          <h1 className="mt-5 text-3xl font-black text-[#171a1f]">M Abdullah Fawad</h1>
          <p className="mt-2 text-sm font-semibold text-[#667085]">abdullah@example.com</p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              ["12", "Orders"],
              ["2", "Open"],
              ["5", "Saved"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-white p-3 text-center">
                <p className="text-xl font-black text-[#171a1f]">{value}</p>
                <p className="text-xs font-bold text-[#667085]">{label}</p>
              </div>
            ))}
          </div>
        </aside>

        <div>
          <p className="eyebrow">Account dashboard</p>
          <h2 className="section-title mt-3">Manage your HOTSPRING experience.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {actions.map((action) => (
              <Link key={action.href} href={action.href} className="card-hover rounded-[1.5rem] border border-black/5 bg-white p-6 shadow-sm">
                <action.icon className="text-[#0f766e]" size={28} />
                <h3 className="mt-5 text-xl font-black text-[#171a1f]">{action.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#667085]">{action.body}</p>
              </Link>
            ))}
          </div>

          <div className="glass-panel mt-8 rounded-[1.7rem] p-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-2xl font-black text-[#171a1f]">Recent orders</h3>
              <PackageCheck className="text-[#0f766e]" size={26} />
            </div>
            <div className="mt-5 grid gap-3">
              {orderHistory.slice(0, 3).map((order) => (
                <Link key={order.id} href="/profile/order-details" className="grid gap-3 rounded-2xl border border-black/5 bg-white p-4 md:grid-cols-[1fr_auto_auto] md:items-center">
                  <span>
                    <span className="block font-black text-[#171a1f]">{order.id}</span>
                    <span className="block text-sm font-semibold text-[#667085]">{order.date}</span>
                  </span>
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-black text-[#0b4f4a]">{order.status}</span>
                  <span className="font-black text-[#171a1f]">{formatCurrency(order.total)}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
