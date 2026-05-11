import { AddressForm } from "@/components/forms";

export const metadata = {
  title: "Edit Billing Address",
};

export default function EditBillingAddressPage() {
  return (
    <section className="container-page section-pad">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow">Billing</p>
        <h1 className="section-title mt-3">Edit billing address.</h1>
        <p className="body-lead mt-4">Keep invoice details accurate for faster checkout and service documentation.</p>
      </div>
      <AddressForm type="billing" />
    </section>
  );
}
