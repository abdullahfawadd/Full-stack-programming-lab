"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/task-1", label: "Task 1" },
  { href: "/task-2", label: "Task 2" },
  { href: "/home", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

const isActiveLink = (pathname: string, href: string): boolean => {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandTitle}>Lab 08 Next.js</span>
          <span className={styles.brandMeta}>M Abdullah | 232052</span>
        </Link>

        <nav aria-label="Primary navigation" className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${isActiveLink(pathname, link.href) ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
