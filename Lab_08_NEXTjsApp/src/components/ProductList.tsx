import Link from "next/link";
import { products } from "@/data/products";
import styles from "./ProductList.module.css";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function ProductList() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.kicker}>Task 2 | ProductList</p>
        <h1>Product listing driven by reusable component logic.</h1>
        <p>
          This ProductList renders data from a typed product source and links each card
          to a dedicated dynamic product page using route parameters.
        </p>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <article key={product.slug} className={styles.card}>
            <div>
              <p className={styles.category}>{product.category}</p>
              <h2>{product.title}</h2>
              <p className={styles.description}>{product.shortDescription}</p>
            </div>

            <div className={styles.bottomRow}>
              <strong>{priceFormatter.format(product.price)}</strong>
              <Link href={`/products/${product.slug}`} className={styles.link}>
                View product
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
