import type { Metadata } from "next";
import Link from "next/link";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Home",
  description: "Task 1 Home page with navigation into Task 2 product workflow.",
};

export default function HomePage() {
  return (
    <section className={styles.wrapper}>
      <header className={styles.hero}>
        <p>Home</p>
        <h1>Welcome to the Multi-Page Experience</h1>
        <span>
          This Home page is part of Task 1 and connects directly to About, Contact,
          ProductList, and dynamic product detail routes.
        </span>

        <div className={styles.actions}>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/products">ProductList</Link>
        </div>
      </header>

      <section className={styles.profileCard}>
        <h2>Project Owner</h2>
        <ul>
          <li>
            <span>Name</span>
            <strong>M Abdullah</strong>
          </li>
          <li>
            <span>Reg ID</span>
            <strong>232052</strong>
          </li>
          <li>
            <span>Institution</span>
            <strong>Air University Islamabad</strong>
          </li>
        </ul>
      </section>
    </section>
  );
}
