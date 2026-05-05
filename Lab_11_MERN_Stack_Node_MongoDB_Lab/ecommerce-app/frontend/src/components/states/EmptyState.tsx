import { PackageSearch } from "lucide-react";

export function EmptyState() {
  return (
    <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-lg">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-accent">
        <PackageSearch size={26} />
      </div>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink">
        No products yet
      </h3>
      <p className="mx-auto mt-3 max-w-md text-graphite">
        Add products with `POST /api/products` or run the backend seed command to
        populate the MongoDB collection.
      </p>
    </div>
  );
}
