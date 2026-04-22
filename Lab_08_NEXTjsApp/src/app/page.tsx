import Link from "next/link";
import styles from "./page.module.css";

const TASKS = [
  {
    title: "Task 1",
    href: "/task-1",
    summary:
      "Multi-page application with dedicated Home, About, and Contact pages, shared navigation, and global footer via layout.",
    cta: "Open Task 1",
  },
  {
    title: "Task 2",
    href: "/task-2",
    summary:
      "Dynamic component architecture with ProductList, dynamic product routes, and direct navigation between home, list, and detail pages.",
    cta: "Open Task 2",
  },
];

export default function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.kicker}>Dashboard</p>
          <h1>Professional Next.js Lab Workspace</h1>
          <p>
            Start from this landing page, then navigate into Task 1 and Task 2. The
            project is structured with reusable components, App Router best practices,
            and production-ready styling consistency.
          </p>

          <div className={styles.heroActions}>
            <Link href="/task-1" className={styles.primaryButton}>
              Go to Task 1
            </Link>
            <Link href="/task-2" className={styles.secondaryButton}>
              Go to Task 2
            </Link>
          </div>
        </div>

        <aside className={styles.identityCard}>
          <h2>Student Information</h2>
          <dl>
            <div>
              <dt>Name</dt>
              <dd>M Abdullah</dd>
            </div>
            <div>
              <dt>Registration ID</dt>
              <dd>232052</dd>
            </div>
            <div>
              <dt>University</dt>
              <dd>Air University Islamabad</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className={styles.taskSection}>
        <h2>Lab Tasks</h2>
        <div className={styles.taskGrid}>
          {TASKS.map((task, index) => (
            <article
              key={task.title}
              className={styles.taskCard}
              style={{ animationDelay: `${120 + index * 120}ms` }}
            >
              <span>{task.title}</span>
              <p>{task.summary}</p>
              <Link href={task.href}>{task.cta}</Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
