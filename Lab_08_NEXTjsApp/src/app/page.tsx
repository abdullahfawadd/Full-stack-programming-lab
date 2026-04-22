import Link from "next/link";
import { products } from "@/data/products";
import styles from "./page.module.css";

const featuredProducts = products.slice(0, 3);
const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function HomePage() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Lab 08 | Next.js App Router</p>
          <h1>Build a modern multi-page storefront with dynamic routing.</h1>
          <p>
            This production-style demo showcases reusable layouts, typed product data,
            and clear navigation patterns across static and dynamic pages.
          </p>

          <div className={styles.ctaRow}>
            <Link href="/products" className={styles.primaryCta}>
              Browse products
            </Link>
            <Link href="/about" className={styles.secondaryCta}>
              Learn more
            </Link>
          </div>
        </div>

        <aside className={styles.heroPanel}>
          <h2>Included in this build</h2>
          <ul>
            <li>Home, About, and Contact pages</li>
            <li>Global header and footer through shared layout</li>
            <li>Dynamic product pages with route params</li>
          </ul>
          <Link href="/contact" className={styles.inlineLink}>
            Start a conversation
          </Link>
        </aside>
      </section>

      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2>Featured products</h2>
          <Link href="/products">View full catalog</Link>
        </div>

        <div className={styles.featureGrid}>
          {featuredProducts.map((product) => (
            <article key={product.slug} className={styles.featureCard}>
              <p>{product.category}</p>
              <h3>{product.title}</h3>
              <span>{priceFormatter.format(product.price)}</span>
              <Link href={`/products/${product.slug}`}>Open details</Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
