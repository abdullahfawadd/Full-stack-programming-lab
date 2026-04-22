import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import styles from "./product-detail.module.css";

type ProductDetailPageProps = {
  params: {
    slug: string;
  };
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product not found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.title,
    description: product.shortDescription,
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <article className={styles.wrapper}>
      <p className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/products">Products</Link>
        <span>/</span>
        <strong>{product.title}</strong>
      </p>

      <header className={styles.hero}>
        <p className={styles.category}>{product.category}</p>
        <h1>{product.title}</h1>
        <p className={styles.description}>{product.description}</p>
        <strong className={styles.price}>{priceFormatter.format(product.price)}</strong>
      </header>

      <section className={styles.highlights}>
        <h2>Key highlights</h2>
        <ul>
          {product.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>

      <div className={styles.actions}>
        <Link href="/products" className={styles.secondary}>
          Back to products
        </Link>
        <Link href="/contact" className={styles.primary}>
          Contact sales
        </Link>
      </div>
    </article>
  );
}
