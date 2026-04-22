import type { Metadata } from "next";
import Link from "next/link";
import ProductList from "@/components/ProductList";
import styles from "./products.module.css";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse products and navigate into dynamic product detail pages.",
};

export default function ProductsPage() {
  return (
    <div className={styles.wrapper}>
      <ProductList />

      <div className={styles.actions}>
        <Link href="/" className={styles.secondary}>
          Back to home
        </Link>
        <Link href="/contact" className={styles.primary}>
          Contact sales
        </Link>
      </div>
    </div>
  );
}
