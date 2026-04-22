import type { Metadata } from "next";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact page for the lab project submission and feedback.",
};

export default function ContactPage() {
  return (
    <section className={styles.contact}>
      <header className={styles.header}>
        <p>Contact</p>
        <h1>Share feedback on the project implementation.</h1>
        <span>
          This page completes Task 1 and provides a professional contact interface with
          practical form structure and direct details.
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
              <span>Student</span>
              <strong>M Abdullah</strong>
            </li>
            <li>
              <span>Registration ID</span>
              <strong>232052</strong>
            </li>
            <li>
              <span>Institution</span>
              <strong>Air University Islamabad</strong>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
