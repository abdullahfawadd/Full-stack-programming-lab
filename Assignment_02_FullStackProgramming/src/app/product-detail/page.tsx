import Link from "next/link";
import { ProductDetailClient } from "@/components/commerce-client";
import { ProductCard } from "@/components/product-card";
import { getProduct, products } from "@/lib/data";

export const metadata = {
  title: "Serenity Pro 6-Person",
};

export default function ProductDetailPage() {
  const product = getProduct("serenity-pro-6-person");

  return (
    <>
      <ProductDetailClient product={product} />
      <section className="container-page pb-20">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">You may also like</p>
            <h2 className="section-title mt-3">Complete the wellness setup.</h2>
          </div>
          <Link href="/category" className="button-secondary">Shop all</Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {products.slice(1, 4).map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </>
  );
}
