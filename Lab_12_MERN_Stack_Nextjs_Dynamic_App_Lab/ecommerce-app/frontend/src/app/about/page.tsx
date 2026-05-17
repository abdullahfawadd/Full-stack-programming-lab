import { BadgeCheck, Leaf, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="shell py-12">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-medium text-sage-dark">About the store</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-6xl">
            Rustik Studio keeps plant retail calm, useful, and beautiful.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
            The project combines a polished ecommerce interface with a dynamic
            MERN backend. Products, images, inventory, and featured states come
            from MongoDB instead of hard-coded page content.
          </p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted soft-shadow">
          <Image
            src="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1400&q=85"
            alt="Minimal indoor plant shelf"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-3">
        {[
          [
            <Leaf key="leaf" size={22} />,
            "Rustik theme",
            "Plant goods, ceramic forms, wood textures, and restrained color.",
          ],
          [
            <ShieldCheck key="shield" size={22} />,
            "Clean stack",
            "Next.js frontend, Express API, Mongoose validation, and MongoDB.",
          ],
          [
            <BadgeCheck key="badge" size={22} />,
            "Submission ready",
            "Documented commands, screenshots, CRUD flow, and responsive pages.",
          ],
        ].map(([icon, title, copy]) => (
          <article
            key={String(title)}
            className="rounded-lg border border-line bg-surface p-5"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-sage-dark">
              {icon}
            </div>
            <h2 className="mt-5 text-xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-ink-soft">{copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
