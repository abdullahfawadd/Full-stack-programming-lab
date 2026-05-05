import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatCurrency";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product._id}`}
      className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-3 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-mist">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-ink">
              {product.name}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-graphite">
              {product.description}
            </p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-cloud text-ink transition group-hover:bg-ink group-hover:text-white">
            <ArrowUpRight size={18} />
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-xl font-semibold text-ink">
            {formatCurrency(product.price)}
          </p>
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-accent">
            In stock
          </span>
        </div>
      </div>
    </Link>
  );
}
