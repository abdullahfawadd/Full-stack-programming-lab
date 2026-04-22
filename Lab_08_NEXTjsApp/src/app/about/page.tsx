import type { Metadata } from "next";
import Link from "next/link";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the design and engineering principles behind this Next.js app.",
};

const principles = [
  {
    title: "Design with intent",
    detail:
      "Every section has a specific communication goal, from hierarchy in typography to spacing rhythm and contrast choices.",
  },
  {
    title: "Code for maintainability",
    detail:
      "Reusable components, typed data models, and modular styles keep the project easy to scale without introducing fragile coupling.",
  },
  {
    title: "Ship with confidence",
    detail:
      "The app uses App Router conventions, metadata per route, and production scripts ready for build, linting, and deployment.",
  },
];

export default function AboutPage() {
  return (
    <article className={styles.about}>
      <header className={styles.header}>
        <p>About</p>
        <h1>Engineering quality and visual craft in one workflow.</h1>
        <span>
          This lab project demonstrates how modern Next.js applications can be structured
          with clarity while still delivering a polished, brand-focused interface.
        </span>
      </header>

      <section className={styles.grid}>
        {principles.map((principle) => (
          <article key={principle.title} className={styles.card}>
            <h2>{principle.title}</h2>
            <p>{principle.detail}</p>
          </article>
        ))}
      </section>

      <div className={styles.actions}>
        <Link href="/products">Explore products</Link>
        <Link href="/contact">Contact the team</Link>
      </div>
    </article>
  );
}
