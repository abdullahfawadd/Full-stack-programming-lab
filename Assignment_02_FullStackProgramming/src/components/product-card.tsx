import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { formatCurrency, type Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card-hover overflow-hidden rounded-[1.6rem] border border-black/5 bg-white shadow-sm">
      <Link href="/product-detail" className="group block">
        <div className="relative aspect-square overflow-hidden bg-[#eee9df]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          {product.badge ? (
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#0b4f4a] shadow-sm">
              {product.badge}
            </span>
          ) : null}
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0f766e]">{product.category}</p>
          <span className="flex items-center gap-1 text-sm font-black text-[#171a1f]">
            <Star size={15} className="fill-[#c29a4b] text-[#c29a4b]" />
            {product.rating}
          </span>
        </div>
        <h3 className="mt-3 text-xl font-black text-[#171a1f]">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#667085]">{product.description}</p>
        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-lg font-black text-[#171a1f]">{formatCurrency(product.price)}</p>
            {product.compareAt ? (
              <p className="text-sm font-semibold text-[#98a2b3] line-through">{formatCurrency(product.compareAt)}</p>
            ) : null}
          </div>
          <Link href="/product-detail" className="button-secondary min-h-10 px-4 text-sm">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
