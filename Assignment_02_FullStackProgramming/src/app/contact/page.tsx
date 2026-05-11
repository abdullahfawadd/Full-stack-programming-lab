import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms";

export const metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <section className="container-page section-pad">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <p className="eyebrow">Contact us</p>
          <h1 className="display-title mt-4">Start your wellness project.</h1>
          <p className="body-lead mt-6">
            Share your space, budget, and installation timeline. The HOTSPRING team will help you choose the right product and delivery plan.
          </p>
          <div className="mt-8 grid gap-4">
            {[
              [MapPin, "Showroom", "F-8 Markaz, Islamabad"],
              [Phone, "Phone", "+92 300 1234567"],
              [Mail, "Email", "hello@hotspring.pk"],
              [Clock, "Hours", "Mon to Sat, 10 AM to 7 PM"],
            ].map(([Icon, title, body]) => {
              const DetailIcon = Icon as typeof MapPin;
              return (
                <div key={String(title)} className="glass-panel flex items-center gap-4 rounded-3xl p-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f766e] text-white">
                    <DetailIcon size={21} />
                  </span>
                  <span>
                    <span className="block text-sm font-black text-[#171a1f]">{title as string}</span>
                    <span className="block text-sm font-semibold text-[#667085]">{body as string}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
