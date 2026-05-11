import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions",
};

const sections = [
  {
    title: "Product information",
    body: "Product visuals, dimensions, and specifications are prepared for a student demo storefront. Final commercial details should always be confirmed with a sales consultant.",
  },
  {
    title: "Orders and payment",
    body: "Checkout flows in this assignment are local demo interactions only. No real payment, account login, or backend transaction is processed.",
  },
  {
    title: "Delivery and installation",
    body: "Delivery timelines depend on city, access requirements, product availability, and installation readiness at the selected site.",
  },
  {
    title: "Warranty and support",
    body: "Warranty coverage is represented as a polished UI concept. A real commercial warranty would be provided in official purchase documents.",
  },
  {
    title: "Privacy",
    body: "Forms validate input and display local success states, but this demo does not store or transmit personal information.",
  },
];

export default function TermsPage() {
  return (
    <section className="container-page section-pad">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Terms & conditions</p>
        <h1 className="display-title mt-4">Clear policies for a confident purchase.</h1>
        <p className="body-lead mt-6">
          These terms explain the demo storefront experience used for Assignment 02 and mirror the structure of a professional e-commerce policy page.
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-4xl gap-4">
        {sections.map((section, index) => (
          <article key={section.title} className="glass-panel rounded-[1.5rem] p-6">
            <p className="text-sm font-black text-[#0f766e]">0{index + 1}</p>
            <h2 className="mt-2 text-2xl font-black text-[#171a1f]">{section.title}</h2>
            <p className="mt-3 leading-7 text-[#667085]">{section.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/shopping/payment" className="button-primary">Return to checkout</Link>
      </div>
    </section>
  );
}
