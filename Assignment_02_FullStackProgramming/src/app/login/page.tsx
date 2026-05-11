import { LoginForm } from "@/components/forms";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <section className="container-page section-pad mx-auto max-w-xl">
      <LoginForm />
    </section>
  );
}
