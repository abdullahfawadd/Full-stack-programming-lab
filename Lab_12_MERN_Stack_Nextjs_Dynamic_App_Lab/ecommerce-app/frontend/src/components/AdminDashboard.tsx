"use client";

import { Edit3, Plus, RefreshCw, Save, Trash2, X } from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/lib/api";
import { formatCurrency } from "@/lib/format";
import type { Product, ProductInput } from "@/types/product";

type ProductFormState = {
  name: string;
  category: string;
  price: string;
  oldPrice: string;
  image: string;
  gallery: string;
  description: string;
  details: string;
  material: string;
  dimensions: string;
  care: string;
  stock: string;
  rating: string;
  featured: boolean;
  tags: string;
};

const emptyForm: ProductFormState = {
  name: "",
  category: "Planters",
  price: "",
  oldPrice: "",
  image: "",
  gallery: "",
  description: "",
  details: "",
  material: "",
  dimensions: "",
  care: "",
  stock: "10",
  rating: "4.8",
  featured: false,
  tags: "",
};

const toLines = (value: string) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const toCommas = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const productToForm = (product: Product): ProductFormState => ({
  name: product.name,
  category: product.category,
  price: String(product.price),
  oldPrice: product.oldPrice ? String(product.oldPrice) : "",
  image: product.image,
  gallery: product.gallery.join("\n"),
  description: product.description,
  details: product.details.join("\n"),
  material: product.material,
  dimensions: product.dimensions,
  care: product.care,
  stock: String(product.stock),
  rating: String(product.rating),
  featured: product.featured,
  tags: product.tags.join(", "),
});

const formToProduct = (form: ProductFormState): ProductInput => ({
  name: form.name,
  category: form.category,
  price: Number(form.price),
  oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
  image: form.image,
  gallery: toLines(form.gallery),
  description: form.description,
  details: toLines(form.details),
  material: form.material,
  dimensions: form.dimensions,
  care: form.care,
  stock: Number(form.stock),
  rating: Number(form.rating),
  featured: form.featured,
  tags: toCommas(form.tags),
});

export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const categories = useMemo(
    () => ["Planters", "Decor", "Care", "Hanging", "Furniture"],
    [],
  );

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      if (editingId) {
        await updateProduct(editingId, formToProduct(form));
        setMessage("Product updated.");
      } else {
        await createProduct(formToProduct(form));
        setMessage("Product created.");
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadProducts();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product._id);
    setForm(productToForm(product));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (product: Product) => {
    const confirmed = window.confirm(`Delete ${product.name}?`);
    if (!confirmed) return;

    await deleteProduct(product._id);
    await loadProducts();
    setMessage("Product deleted.");
  };

  return (
    <main className="shell py-12">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-sage-dark">Admin CRUD</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-6xl">
            Product studio.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
            Manage the live `lab12_dynamic_ecommerce.products` collection from
            one clean dashboard.
          </p>
        </div>
        <button
          type="button"
          onClick={loadProducts}
          className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Database", "lab12_dynamic_ecommerce"],
          ["Collection", "products"],
          ["Records", String(products.length)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-line bg-surface p-5">
            <p className="text-sm text-ink-soft">{label}</p>
            <p className="mt-2 break-words font-mono text-sm font-semibold">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[440px_1fr]">
        <form
          onSubmit={handleSubmit}
          className="h-fit rounded-lg border border-line bg-surface p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit product" : "Create product"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
                className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line"
                aria-label="Cancel edit"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm font-medium">
              Name
              <input
                required
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                className="focus-ring h-11 rounded-lg border border-line bg-background px-3 text-sm font-normal"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                Category
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  className="focus-ring h-11 rounded-lg border border-line bg-background px-3 text-sm font-normal"
                >
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Price
                <input
                  required
                  min="0"
                  type="number"
                  value={form.price}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      price: event.target.value,
                    }))
                  }
                  className="focus-ring h-11 rounded-lg border border-line bg-background px-3 text-sm font-normal"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="grid gap-2 text-sm font-medium">
                Old price
                <input
                  min="0"
                  type="number"
                  value={form.oldPrice}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      oldPrice: event.target.value,
                    }))
                  }
                  className="focus-ring h-11 rounded-lg border border-line bg-background px-3 text-sm font-normal"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Stock
                <input
                  required
                  min="0"
                  type="number"
                  value={form.stock}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      stock: event.target.value,
                    }))
                  }
                  className="focus-ring h-11 rounded-lg border border-line bg-background px-3 text-sm font-normal"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Rating
                <input
                  required
                  min="0"
                  max="5"
                  step="0.1"
                  type="number"
                  value={form.rating}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      rating: event.target.value,
                    }))
                  }
                  className="focus-ring h-11 rounded-lg border border-line bg-background px-3 text-sm font-normal"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium">
              Image URL
              <input
                required
                value={form.image}
                onChange={(event) =>
                  setForm((current) => ({ ...current, image: event.target.value }))
                }
                className="focus-ring h-11 rounded-lg border border-line bg-background px-3 text-sm font-normal"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Description
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                className="focus-ring resize-none rounded-lg border border-line bg-background px-3 py-3 text-sm font-normal"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Gallery URLs
              <textarea
                rows={3}
                value={form.gallery}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    gallery: event.target.value,
                  }))
                }
                className="focus-ring resize-none rounded-lg border border-line bg-background px-3 py-3 text-sm font-normal"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Details
              <textarea
                rows={3}
                value={form.details}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    details: event.target.value,
                  }))
                }
                className="focus-ring resize-none rounded-lg border border-line bg-background px-3 py-3 text-sm font-normal"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-3">
              {(["material", "dimensions", "care"] as const).map((field) => (
                <label key={field} className="grid gap-2 text-sm font-medium">
                  {field[0].toUpperCase() + field.slice(1)}
                  <input
                    value={form[field]}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        [field]: event.target.value,
                      }))
                    }
                    className="focus-ring h-11 rounded-lg border border-line bg-background px-3 text-sm font-normal"
                  />
                </label>
              ))}
            </div>

            <label className="grid gap-2 text-sm font-medium">
              Tags
              <input
                value={form.tags}
                onChange={(event) =>
                  setForm((current) => ({ ...current, tags: event.target.value }))
                }
                className="focus-ring h-11 rounded-lg border border-line bg-background px-3 text-sm font-normal"
              />
            </label>

            <label className="flex items-center gap-3 rounded-lg border border-line bg-background p-3 text-sm font-medium">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    featured: event.target.checked,
                  }))
                }
                className="accent-sage"
              />
              Featured product
            </label>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="focus-ring mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-sm font-semibold text-white disabled:bg-ink-soft"
          >
            {editingId ? <Save size={17} /> : <Plus size={17} />}
            {isSaving ? "Saving" : editingId ? "Update product" : "Create product"}
          </button>
          {message && (
            <p className="mt-4 rounded-lg border border-line bg-background p-3 text-sm text-ink-soft">
              {message}
            </p>
          )}
        </form>

        <section>
          {isLoading ? (
            <div className="grid gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-32 animate-pulse rounded-lg border border-line bg-surface"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-4">
              {products.map((product) => (
                <article
                  key={product._id}
                  className="grid gap-4 rounded-lg border border-line bg-surface p-4 md:grid-cols-[120px_1fr_auto]"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      loading="eager"
                      sizes="120px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-sage-dark">{product.category}</p>
                    <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-soft">
                      {product.description}
                    </p>
                    <p className="mt-3 text-sm font-semibold">
                      {formatCurrency(product.price)} · Stock {product.stock}
                    </p>
                  </div>
                  <div className="flex gap-2 md:flex-col">
                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                      className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line"
                      aria-label={`Edit ${product.name}`}
                    >
                      <Edit3 size={17} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
                      className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-clay"
                      aria-label={`Delete ${product.name}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
