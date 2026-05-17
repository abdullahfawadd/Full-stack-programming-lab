"use client";

import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

export function ProductShowcase({ featuredOnly = false }: { featuredOnly?: boolean }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProducts(featuredOnly ? { featured: true } : {});
      setProducts(featuredOnly ? data.slice(0, 4) : data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Products could not be loaded.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isActive = true;

    getProducts(featuredOnly ? { featured: true } : {})
      .then((data) => {
        if (isActive) {
          setProducts(featuredOnly ? data.slice(0, 4) : data);
        }
      })
      .catch((loadError) => {
        if (isActive) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Products could not be loaded.",
          );
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [featuredOnly]);

  if (isLoading) {
    return (
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-80 animate-pulse rounded-lg border border-line bg-surface"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-line bg-surface p-6">
        <p className="text-sm text-ink-soft">{error}</p>
        <button
          type="button"
          onClick={loadProducts}
          className="focus-ring mt-4 inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-white"
        >
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
