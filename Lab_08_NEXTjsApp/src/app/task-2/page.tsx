import type { Metadata } from "next";
import Link from "next/link";
import ProductList from "@/components/ProductList";
import { products } from "@/data/products";
import styles from "./task-2.module.css";

export const metadata: Metadata = {
  title: "Task 2",
  description:
    "Task 2 implementation with a dynamic product component, product listing page, and route-based product detail pages.",
};

export default function TaskTwoPage() {
  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <p>Task 2</p>
        <h1>Dynamic Product Components</h1>
        <span>
          The product experience includes reusable data-driven rendering, navigation from
          Home to ProductList, and dynamic product detail routes for each item.
        </span>
      </header>

      <div className={styles.quickLinks}>
        <Link href="/home">Home</Link>
        <Link href="/products">ProductList</Link>
        {products.map((product) => (
          <Link key={product.slug} href={`/products/${product.slug}`}>
            {product.title}
          </Link>
        ))}
      </div>

      <ProductList />

      <div className={styles.actions}>
        <Link href="/">Back to Dashboard</Link>
        <Link href="/products">Open ProductList Page</Link>
      </div>
    </section>
  );
}
