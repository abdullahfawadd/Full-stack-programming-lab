"use client";

import { RefreshCw, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

export function ProductBrowser() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((item) => item.category)))],
    [products],
  );

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
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

    getProducts()
      .then((data) => {
        if (isActive) {
          setProducts(data);
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
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const needle = search.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(needle) ||
      product.description.toLowerCase().includes(needle) ||
      product.category.toLowerCase().includes(needle);

    return matchesCategory && matchesSearch;
  });

  return (
    <main>
      <section className="shell grid gap-6 py-10 lg:grid-cols-[1fr_420px] lg:items-stretch">
        <div className="rounded-lg border border-line bg-surface p-6 md:p-10">
          <p className="text-sm font-medium text-sage-dark">Live catalog</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-semibold leading-none md:text-7xl">
            Shop the Rustik edit.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft">
            Filter the live MongoDB catalog, inspect details, and add pieces to
            the cart from a responsive product grid.
          </p>
        </div>

        <div className="relative min-h-72 overflow-hidden rounded-lg bg-muted">
          <Image
            src="/products/ceramic-shelf.jpg"
            alt="Curated plant and home objects"
            fill
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-cover"
          />
        </div>
      </section>

      <section className="shell pb-12">
        <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-3 sm:flex-row sm:items-center">
          <label className="relative min-w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
              size={18}
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products"
              className="focus-ring h-11 w-full rounded-lg border border-line bg-background pl-10 pr-3 text-sm"
            />
          </label>
          <button
            type="button"
            onClick={loadProducts}
            className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`focus-ring shrink-0 rounded-lg border px-4 py-2 text-sm transition ${
              category === item
                ? "border-foreground bg-foreground text-white"
                : "border-line bg-surface text-ink-soft hover:border-sage"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-80 animate-pulse rounded-lg border border-line bg-surface"
            />
          ))}
        </div>
      ) : error ? (
        <div className="mt-8 rounded-lg border border-line bg-surface p-6 text-ink-soft">
          {error}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="mt-8 rounded-lg border border-line bg-surface p-8 text-ink-soft">
          No products match this filter.
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      </section>
    </main>
  );
}
