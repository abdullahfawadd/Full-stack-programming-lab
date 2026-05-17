import { Mail, MapPin, Phone } from "lucide-react";
import { ContactPanel } from "@/components/ContactPanel";

export default function ContactPage() {
  return (
    <main className="shell py-12">
      <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-medium text-sage-dark">Contact</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-6xl">
            Simple support for a modern storefront.
          </h1>
          <p className="mt-6 text-lg leading-8 text-ink-soft">
            The contact page is styled as part of the production interface and
            keeps the lab submission complete across main and sub-pages.
          </p>

          <div className="mt-8 grid gap-3">
            {[
              [<Mail key="mail" size={18} />, "support@rustik.local"],
              [<Phone key="phone" size={18} />, "+92 300 0000000"],
              [<MapPin key="map" size={18} />, "Air University Islamabad"],
            ].map(([icon, text]) => (
              <div
                key={String(text)}
                className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4 text-sm"
              >
                <span className="text-sage-dark">{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>

        <ContactPanel />
      </section>
    </main>
  );
}
