"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, CreditCard, Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import { cartSeed, formatCurrency, getProduct, products, type Product } from "@/lib/data";

function Toast({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm font-bold text-emerald-800 shadow-2xl">
      <CheckCircle2 size={18} />
      {message}
    </div>
  );
}

export function ProductDetailClient({ product }: { product: Product }) {
  const [image, setImage] = useState(product.gallery[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState("");

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  return (
    <section className="container-page section-pad grid gap-10 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm">
          <Image src={image} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {product.gallery.map((galleryImage) => (
            <button
              key={galleryImage}
              type="button"
              onClick={() => setImage(galleryImage)}
              className={`relative aspect-square overflow-hidden rounded-2xl border bg-white ${image === galleryImage ? "border-[#0f766e] ring-4 ring-[#0f766e]/10" : "border-black/5"}`}
              aria-label="Switch product image"
            >
              <Image src={galleryImage} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
        <p className="eyebrow">Product details</p>
        <h1 className="mt-4 text-4xl font-black leading-tight text-[#171a1f] sm:text-5xl">{product.name}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-bold text-[#667085]">
          <span>{product.rating} stars</span>
          <span>{product.reviews} reviews</span>
          <span>SKU: HS-SP6-2026</span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">In stock</span>
        </div>
        <div className="mt-7 flex items-end gap-3">
          <p className="text-3xl font-black text-[#171a1f]">{formatCurrency(product.price)}</p>
          {product.compareAt ? <p className="pb-1 text-lg font-bold text-[#98a2b3] line-through">{formatCurrency(product.compareAt)}</p> : null}
        </div>
        <p className="mt-5 text-lg leading-8 text-[#667085]">{product.description}</p>

        <div className="mt-7">
          <p className="label">
            Color: <span className="text-[#0b4f4a]">{color}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setColor(item)}
                className={`rounded-full border px-4 py-2 text-sm font-bold ${color === item ? "border-[#0f766e] bg-[#0f766e] text-white" : "border-black/10 bg-white text-[#3d424a]"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <div className="flex h-12 items-center overflow-hidden rounded-full border border-black/10 bg-white">
            <button type="button" className="flex h-full w-12 items-center justify-center hover:bg-[#f0ece3]" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
              <Minus size={16} />
            </button>
            <span className="w-12 text-center font-black">{quantity}</span>
            <button type="button" className="flex h-full w-12 items-center justify-center hover:bg-[#f0ece3]" onClick={() => setQuantity((value) => Math.min(9, value + 1))}>
              <Plus size={16} />
            </button>
          </div>
          <button className="button-primary" type="button" onClick={() => notify(`${quantity} ${product.name} added to cart.`)}>
            Add to cart
          </button>
          <Link className="button-secondary" href="/shopping/cart">View cart</Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {product.features.map((feature) => (
            <div key={feature} className="rounded-2xl border border-black/5 bg-white/72 p-4 text-sm font-bold text-[#3d424a]">
              {feature}
            </div>
          ))}
        </div>
      </div>
      <Toast message={toast} />
    </section>
  );
}

type CartItem = {
  id: string;
  name: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
};

function seededCart(): CartItem[] {
  return cartSeed.map((item, index) => {
    if ("productSlug" in item) {
      const product = getProduct(item.productSlug);
      return {
        id: product.slug,
        name: product.name,
        color: item.color,
        price: product.price,
        image: product.image,
        quantity: item.quantity,
      };
    }

    return {
      id: `custom-${index}`,
      name: item.customName,
      color: item.color,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    };
  });
}

export function CartClient() {
  const [items, setItems] = useState<CartItem[]>(seededCart);
  const [coupon, setCoupon] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [message, setMessage] = useState("");
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * discountRate;
  const tax = (subtotal - discount) * 0.085;
  const total = subtotal - discount + tax;

  function setQuantity(id: string, quantity: number) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, Math.min(9, quantity)) } : item)));
  }

  function applyCoupon() {
    const coupons: Record<string, number> = { HOTSPRING10: 0.1, SAVE20: 0.2, WELCOME: 0.05 };
    const rate = coupons[coupon.trim().toUpperCase()];
    if (!rate) {
      setMessage("Invalid coupon code. Try HOTSPRING10, SAVE20, or WELCOME.");
      setDiscountRate(0);
      return;
    }
    setDiscountRate(rate);
    setMessage(`${Math.round(rate * 100)}% coupon applied.`);
  }

  return (
    <section className="container-page section-pad">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Shopping cart</p>
          <h1 className="section-title mt-3">Review your wellness setup.</h1>
        </div>
        <Link href="/category" className="button-secondary">Continue shopping</Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-4">
          {items.length ? (
            items.map((item) => (
              <article key={item.id} className="glass-panel grid gap-5 rounded-[1.5rem] p-4 sm:grid-cols-[120px_1fr_auto] sm:items-center">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
                  <Image src={item.image} alt={item.name} fill sizes="120px" className="object-cover" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#171a1f]">{item.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-[#667085]">Color: {item.color}</p>
                  <p className="mt-3 font-black text-[#171a1f]">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="flex h-11 items-center overflow-hidden rounded-full border border-black/10 bg-white">
                    <button type="button" className="flex h-full w-10 items-center justify-center hover:bg-[#f0ece3]" onClick={() => setQuantity(item.id, item.quantity - 1)}>
                      <Minus size={15} />
                    </button>
                    <span className="w-10 text-center font-black">{item.quantity}</span>
                    <button type="button" className="flex h-full w-10 items-center justify-center hover:bg-[#f0ece3]" onClick={() => setQuantity(item.id, item.quantity + 1)}>
                      <Plus size={15} />
                    </button>
                  </div>
                  <button type="button" className="flex items-center gap-2 text-sm font-bold text-red-600" onClick={() => setItems((current) => current.filter((row) => row.id !== item.id))}>
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="glass-panel rounded-[1.5rem] p-10 text-center">
              <h2 className="text-2xl font-black text-[#171a1f]">Your cart is empty</h2>
              <p className="mt-2 text-[#667085]">Add a hot tub or accessory to continue checkout.</p>
              <Link href="/category" className="button-primary mt-6">Shop products</Link>
            </div>
          )}
        </div>

        <aside className="glass-panel h-fit rounded-[1.7rem] p-6">
          <h2 className="text-2xl font-black text-[#171a1f]">Order summary</h2>
          <div className="mt-6 grid gap-3 text-sm font-semibold text-[#667085]">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
            <div className="flex justify-between"><span>Discount</span><span>-{formatCurrency(discount)}</span></div>
            <div className="flex justify-between"><span>Estimated tax</span><span>{formatCurrency(tax)}</span></div>
            <div className="my-2 border-t border-black/10" />
            <div className="flex justify-between text-xl font-black text-[#171a1f]"><span>Total</span><span>{formatCurrency(total)}</span></div>
          </div>
          <div className="mt-6 flex gap-2">
            <input className="input-field" value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Coupon code" />
            <button type="button" className="button-secondary shrink-0" onClick={applyCoupon}>Apply</button>
          </div>
          {message ? <p className={`mt-3 text-sm font-bold ${message.startsWith("Invalid") ? "text-red-600" : "text-[#0b4f4a]"}`}>{message}</p> : null}
          <Link href="/shopping/payment" className="button-primary mt-6 w-full">Proceed to checkout</Link>
        </aside>
      </div>
    </section>
  );
}

export function CheckoutForm() {
  const [method, setMethod] = useState("credit-card");
  const [card, setCard] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const subtotal = 1135500;
  const tax = 96500;
  const total = subtotal + tax;

  function formatCard(value: string) {
    return value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }

  return (
    <section className="container-page section-pad">
      <div className="mb-10">
        <p className="eyebrow">Checkout</p>
        <h1 className="section-title mt-3">Secure payment and delivery.</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <form
          className="glass-panel rounded-[1.7rem] p-6 sm:p-8"
          onSubmit={(event) => {
            event.preventDefault();
            setConfirmed(true);
          }}
        >
          <h2 className="text-2xl font-black text-[#171a1f]">Shipping details</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label>
              <span className="label">Full name</span>
              <input className="input-field" defaultValue="M Abdullah Fawad" required />
            </label>
            <label>
              <span className="label">Email</span>
              <input className="input-field" defaultValue="abdullah@example.com" required />
            </label>
            <label className="sm:col-span-2">
              <span className="label">Address</span>
              <input className="input-field" defaultValue="House 24, F-8 Markaz, Islamabad" required />
            </label>
            <label>
              <span className="label">City</span>
              <input className="input-field" defaultValue="Islamabad" required />
            </label>
            <label>
              <span className="label">ZIP code</span>
              <input className="input-field" defaultValue="44000" required />
            </label>
          </div>

          <h2 className="mt-10 text-2xl font-black text-[#171a1f]">Payment method</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["credit-card", "Card"],
              ["paypal", "PayPal"],
              ["bank-transfer", "Bank"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setMethod(value)}
                className={`rounded-2xl border p-4 text-left font-black ${method === value ? "border-[#0f766e] bg-[#0f766e] text-white" : "border-black/10 bg-white text-[#3d424a]"}`}
              >
                {label}
              </button>
            ))}
          </div>

          {method === "credit-card" ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="label">Card number</span>
                <input className="input-field" value={card} onChange={(event) => setCard(formatCard(event.target.value))} placeholder="4242 4242 4242 4242" />
              </label>
              <label>
                <span className="label">Expiry</span>
                <input className="input-field" placeholder="12/28" />
              </label>
              <label>
                <span className="label">CVV</span>
                <input className="input-field" placeholder="123" />
              </label>
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-teal-100 bg-teal-50 p-5 text-sm font-bold text-teal-800">
              {method === "paypal" ? "You will be redirected to PayPal after placing the demo order." : "Bank transfer instructions will be emailed after confirmation."}
            </div>
          )}

          <label className="mt-6 flex items-start gap-3 text-sm font-semibold text-[#667085]">
            <input type="checkbox" className="mt-1 accent-[#0f766e]" required />
            I agree to the terms and authorize this demo order.
          </label>
          <button className="button-primary mt-7 w-full sm:w-auto" type="submit">
            <CreditCard size={18} />
            Place order
          </button>
          {confirmed ? (
            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
              Order confirmed. Thank you for choosing HOTSPRING Pakistan.
            </div>
          ) : null}
        </form>

        <aside className="glass-panel h-fit rounded-[1.7rem] p-6">
          <h2 className="text-2xl font-black text-[#171a1f]">Order total</h2>
          <div className="mt-6 grid gap-4">
            {products.slice(0, 1).map((product) => (
              <div key={product.slug} className="flex gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
                  <Image src={product.image} alt={product.name} fill sizes="64px" className="object-cover" />
                </div>
                <div>
                  <p className="font-black text-[#171a1f]">{product.name}</p>
                  <p className="text-sm font-semibold text-[#667085]">Sandstone x 1</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 text-sm font-semibold text-[#667085]">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
            <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
            <div className="flex justify-between border-t border-black/10 pt-4 text-xl font-black text-[#171a1f]"><span>Total</span><span>{formatCurrency(total)}</span></div>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm font-semibold text-[#667085]">
            <ShieldCheck size={18} className="mt-0.5 text-[#0f766e]" />
            Your payment is secured with 256-bit SSL encryption.
          </p>
        </aside>
      </div>
    </section>
  );
}

export function CategoryBrowser() {
  const [price, setPrice] = useState(2000000);
  const [category, setCategory] = useState("All");
  const visible = products.filter((product) => product.price <= price && (category === "All" || product.category === category));
  const categoryOptions = ["All", "Luxury Collection", "Hot Tubs", "Inflatable Spas"];

  return (
    <section className="container-page section-pad">
      <div className="mb-10">
        <p className="eyebrow">Shop hot tubs</p>
        <h1 className="section-title mt-3">Curated wellness systems.</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="glass-panel h-fit rounded-[1.7rem] p-6">
          <p className="text-lg font-black text-[#171a1f]">Filters</p>
          <div className="mt-5 grid gap-2">
            {categoryOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCategory(option)}
                className={`rounded-full border px-4 py-2 text-left text-sm font-bold ${category === option ? "border-[#0f766e] bg-[#0f766e] text-white" : "border-black/10 bg-white text-[#3d424a]"}`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-7">
            <label className="label">Price up to {formatCurrency(price)}</label>
            <input
              type="range"
              min={100000}
              max={2000000}
              step={50000}
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
              className="w-full accent-[#0f766e]"
            />
          </div>
        </aside>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((product) => (
            <ProductTile key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductTile({ product }: { product: Product }) {
  return (
    <article className="card-hover overflow-hidden rounded-[1.6rem] border border-black/5 bg-white shadow-sm">
      <Link href="/product-detail">
        <div className="relative aspect-square overflow-hidden">
          <Image src={product.image} alt={product.name} fill sizes="33vw" className="object-cover" />
        </div>
      </Link>
      <div className="p-5">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0f766e]">{product.category}</p>
        <h2 className="mt-2 text-xl font-black text-[#171a1f]">{product.name}</h2>
        <p className="mt-2 text-sm font-semibold text-[#667085]">{product.capacity}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-black text-[#171a1f]">{formatCurrency(product.price)}</span>
          <Link href="/product-detail" className="button-secondary min-h-10 px-4 text-sm">View</Link>
        </div>
      </div>
    </article>
  );
}
