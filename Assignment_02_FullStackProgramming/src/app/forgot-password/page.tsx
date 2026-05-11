import { ForgotPasswordForm } from "@/components/forms";

export const metadata = {
  title: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <section className="container-page section-pad mx-auto max-w-xl">
      <ForgotPasswordForm />
    </section>
  );
}
