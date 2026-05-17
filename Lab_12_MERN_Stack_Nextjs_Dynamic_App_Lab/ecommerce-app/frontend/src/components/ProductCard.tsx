import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product._id}`}
      className="group block overflow-hidden rounded-lg border border-line bg-surface transition hover:-translate-y-1 hover:border-sage hover:shadow-xl"
    >
      <div className="image-sheen relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1180px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-md bg-cream px-2.5 py-1 text-xs font-medium text-foreground">
            Featured
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-sage-dark">
              {product.category}
            </p>
            <h3 className="mt-1 text-lg font-semibold">{product.name}</h3>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-foreground transition group-hover:bg-foreground group-hover:text-white">
            <ArrowUpRight size={17} />
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink-soft">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold">{formatCurrency(product.price)}</p>
            {product.oldPrice ? (
              <p className="text-sm text-ink-soft line-through">
                {formatCurrency(product.oldPrice)}
              </p>
            ) : null}
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-ink-soft">
            <Star size={15} fill="currentColor" />
            {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
