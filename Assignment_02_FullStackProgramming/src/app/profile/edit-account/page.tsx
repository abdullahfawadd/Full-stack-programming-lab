import { EditAccountForms } from "@/components/forms";

export const metadata = {
  title: "Edit Account",
};

export default function EditAccountPage() {
  return (
    <section className="container-page section-pad">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow">Profile</p>
        <h1 className="section-title mt-3">Edit account.</h1>
        <p className="body-lead mt-4">Update personal details and secure your demo account credentials.</p>
      </div>
      <EditAccountForms />
    </section>
  );
}
