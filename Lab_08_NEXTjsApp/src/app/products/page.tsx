import type { Metadata } from "next";
import Link from "next/link";
import ProductList from "@/components/ProductList";
import styles from "./products.module.css";

export const metadata: Metadata = {
  title: "ProductList",
  description: "Task 2 product listing route with links to dynamic product detail pages.",
};

export default function ProductsPage() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <p>Task 2 Route</p>
        <h1>ProductList Page</h1>
        <span>
          This dedicated route hosts the reusable ProductList component and links to each
          dynamic product detail page.
        </span>
      </header>

      <ProductList />

      <div className={styles.actions}>
        <Link href="/home" className={styles.secondary}>
          Back to Home
        </Link>
        <Link href="/contact" className={styles.primary}>
          Contact
        </Link>
      </div>
    </div>
  );
}
