import { ProductCatalog } from "@/components/ProductCatalog";

const metrics = [
  { label: "Curated Items", value: "24+" },
  { label: "Local API", value: "5000" },
  { label: "MongoDB", value: "Ready" },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <section className="grid gap-8 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="animate-fade-up">
          <p className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-graphite shadow-sm">
            Lab 11 MERN Stack Ecommerce
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Premium shopping experience powered by Node, MongoDB, and Next.js.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite">
            A clean full-stack catalog built with reusable components, typed API
            calls, loading states, and a polished interface for a professional
            university submission.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#products"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Browse Products
            </a>
            <a
              href="http://localhost:5000/api/products"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              View API
            </a>
          </div>
        </div>

        <div className="animate-fade-up rounded-[2rem] border border-white bg-white/80 p-4 shadow-premium">
          <div className="overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-950 via-teal-900 to-orange-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white/15 px-3 py-1 text-sm">
                Commerce Studio
              </span>
              <span className="text-sm text-white/75">232052</span>
            </div>
            <div className="mt-16">
              <p className="text-sm uppercase tracking-[0.22em] text-white/60">
                Featured Drop
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Designed for a modern ecommerce workflow.
              </h2>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl bg-white/12 p-4 backdrop-blur"
                >
                  <p className="text-xl font-semibold">{metric.value}</p>
                  <p className="mt-1 text-xs text-white/70">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProductCatalog />
    </main>
  );
}
