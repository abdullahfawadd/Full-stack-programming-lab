import type { Metadata } from "next";
import Link from "next/link";
import styles from "./task-1.module.css";

export const metadata: Metadata = {
  title: "Task 1",
  description:
    "Task 1 implementation: multi-page Next.js setup with Home, About, and Contact pages using shared layout components.",
};

const pages = [
  {
    title: "Home",
    href: "/home",
    detail: "Primary home page for Task 1 with key links into product and contact flows.",
  },
  {
    title: "About",
    href: "/about",
    detail: "Project overview, architecture approach, and quality standards used in the build.",
  },
  {
    title: "Contact",
    href: "/contact",
    detail: "Professional contact form and direct communication details for the project.",
  },
];

export default function TaskOnePage() {
  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <p>Task 1</p>
        <h1>Multi-page App Structure</h1>
        <span>
          This task delivers the required three pages with shared Header and Footer,
          accessible navigation, and a professional visual system.
        </span>
      </header>

      <div className={styles.grid}>
        {pages.map((page, index) => (
          <article
            key={page.title}
            className={styles.card}
            style={{ animationDelay: `${120 + index * 120}ms` }}
          >
            <h2>{page.title}</h2>
            <p>{page.detail}</p>
            <Link href={page.href}>Open page</Link>
          </article>
        ))}
      </div>

      <div className={styles.actions}>
        <Link href="/">Back to Dashboard</Link>
        <Link href="/task-2">Continue to Task 2</Link>
      </div>
    </section>
  );
}
