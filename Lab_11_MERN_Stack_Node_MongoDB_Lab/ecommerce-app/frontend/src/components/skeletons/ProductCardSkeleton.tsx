export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-3 shadow-lg">
      <div className="aspect-[4/3] animate-pulse rounded-[1.25rem] bg-slate-200" />
      <div className="p-3">
        <div className="h-6 w-3/4 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-slate-200" />
        <div className="mt-3 h-4 w-2/3 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-6 flex items-center justify-between">
          <div className="h-7 w-24 animate-pulse rounded-full bg-slate-200" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
