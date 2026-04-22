import Link from "next/link";
import styles from "./Footer.module.css";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.copy}>M Abdullah (232052) | Air University Islamabad</p>
          <p className={styles.subCopy}>Full Stack Programming Lab 08 | {year}</p>
        </div>
        <div className={styles.links}>
          <Link href="/">Dashboard</Link>
          <Link href="/task-1">Task 1</Link>
          <Link href="/task-2">Task 2</Link>
          <Link href="/home">Home</Link>
          <Link href="/products">Products</Link>
        </div>
      </div>
    </footer>
  );
}
