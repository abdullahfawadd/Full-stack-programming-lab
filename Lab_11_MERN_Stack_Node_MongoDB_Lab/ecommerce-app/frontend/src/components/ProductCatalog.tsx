"use client";

import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { getProducts } from "@/lib/productsApi";
import type { Product } from "@/types/product";
import { EmptyState } from "./states/EmptyState";
import { ErrorState } from "./states/ErrorState";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./skeletons/ProductCardSkeleton";

export function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch {
      setError("Products could not be loaded. Please make sure the backend is running on port 5000.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <section id="products" className="pt-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Product Catalog
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Fresh products from MongoDB.
          </h2>
          <p className="mt-3 max-w-2xl text-graphite">
            Products are fetched live from the Express API using Axios and
            displayed in a responsive, mobile-first grid.
          </p>
        </div>

        <button
          type="button"
          onClick={loadProducts}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && error && <ErrorState message={error} onRetry={loadProducts} />}

      {!isLoading && !error && products.length === 0 && <EmptyState />}

      {!isLoading && !error && products.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
