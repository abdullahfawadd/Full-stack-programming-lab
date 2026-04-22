import type { Metadata } from "next";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out regarding products, partnerships, or implementation support.",
};

export default function ContactPage() {
  return (
    <section className={styles.contact}>
      <header className={styles.header}>
        <p>Contact</p>
        <h1>Let us know what you are building.</h1>
        <span>
          Send project details, timeline, and goals. We usually respond within one
          business day.
        </span>
      </header>

      <div className={styles.grid}>
        <form className={styles.form}>
          <label>
            Full name
            <input type="text" name="name" placeholder="Jane Doe" required />
          </label>

          <label>
            Email address
            <input type="email" name="email" placeholder="jane@company.com" required />
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows={5}
              placeholder="Share your requirements and preferred timeline."
              required
            />
          </label>

          <button type="submit">Send message</button>
        </form>

        <aside className={styles.panel}>
          <h2>Direct channels</h2>
          <ul>
            <li>
              <span>Email</span>
              <strong>hello@asterstudio.example</strong>
            </li>
            <li>
              <span>Phone</span>
              <strong>+1 (415) 555-0184</strong>
            </li>
            <li>
              <span>Hours</span>
              <strong>Mon-Fri, 9:00-18:00</strong>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
