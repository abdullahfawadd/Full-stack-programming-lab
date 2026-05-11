import { RegisterForm } from "@/components/forms";

export const metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <section className="container-page section-pad mx-auto max-w-2xl">
      <RegisterForm />
    </section>
  );
}
