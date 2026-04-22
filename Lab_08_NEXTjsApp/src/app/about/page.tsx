import type { Metadata } from "next";
import Link from "next/link";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Project overview for Task 1 multi-page architecture and quality standards.",
};

const principles = [
  {
    title: "Clear navigation architecture",
    detail:
      "The flow begins at Dashboard and then branches to Task 1 and Task 2, ensuring users understand the assignment structure immediately.",
  },
  {
    title: "Professional implementation",
    detail:
      "Shared layout components, typed product data, and modular styles deliver clean maintainability and production readiness.",
  },
  {
    title: "University submission context",
    detail:
      "This project is built and presented by M Abdullah (232052), Air University Islamabad, with focus on UI quality and best practices.",
  },
];

export default function AboutPage() {
  return (
    <article className={styles.about}>
      <header className={styles.header}>
        <p>About</p>
        <h1>Project intent, structure, and quality approach.</h1>
        <span>
          This page explains how the app is organized, why each task route exists, and
          how reusable architecture supports professional delivery.
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
        <Link href="/task-1">Back to Task 1</Link>
        <Link href="/task-2">Go to Task 2</Link>
      </div>
    </article>
  );
}
