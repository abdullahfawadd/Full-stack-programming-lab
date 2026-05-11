import { AddressForm } from "@/components/forms";

export const metadata = {
  title: "Edit Shipping Address",
};

export default function EditShippingAddressPage() {
  return (
    <section className="container-page section-pad">
      <div className="mb-8 max-w-3xl">
        <p className="eyebrow">Shipping</p>
        <h1 className="section-title mt-3">Edit shipping address.</h1>
        <p className="body-lead mt-4">Set the delivery location our installation team should use for planning.</p>
      </div>
      <AddressForm type="shipping" />
    </section>
  );
}
