import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import styles from "./product-detail.module.css";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
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
  const { slug } = await params;
  const product = getProductBySlug(slug);

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

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <article className={styles.wrapper}>
      <p className={styles.breadcrumb}>
        <Link href="/">Dashboard</Link>
        <span>/</span>
        <Link href="/task-2">Task 2</Link>
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
        <Link href="/home" className={styles.secondary}>
          Home
        </Link>
        <Link href="/products" className={styles.secondary}>
          ProductList
        </Link>
        <Link href="/contact" className={styles.primary}>
          Contact
        </Link>
      </div>
    </article>
  );
}
