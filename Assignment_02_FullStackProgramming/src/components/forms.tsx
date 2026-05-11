"use client";

import Link from "next/link";
import { CheckCircle2, Eye, EyeOff, Lock, Mail, Send } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function passwordScore(password: string) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  return score;
}

function Notice({ message, tone = "success" }: { message: string; tone?: "success" | "error" | "info" }) {
  const styles = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    error: "border-red-200 bg-red-50 text-red-700",
    info: "border-teal-200 bg-teal-50 text-teal-800",
  };

  return (
    <div className={`mt-4 flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold ${styles[tone]}`}>
      <CheckCircle2 size={18} />
      {message}
    </div>
  );
}

function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        className="input-field pr-12"
        type={visible ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#667085] hover:bg-[#f0ece3] hover:text-[#171a1f]"
        aria-label={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((state) => !state)}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    setEmail("");
    setMessage("Thank you for subscribing.");
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-3" : "mx-auto mt-8 max-w-xl"}>
      <div className={compact ? "grid gap-2" : "flex flex-col gap-3 rounded-full border border-black/5 bg-white p-2 shadow-sm sm:flex-row"}>
        <input
          className={compact ? "input-field bg-white/10 text-white placeholder:text-white/38" : "min-h-12 flex-1 rounded-full bg-transparent px-4 outline-none"}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          aria-label="Email address"
        />
        <button className={compact ? "button-primary bg-white text-[#171a1f] hover:bg-white/90" : "button-primary"} type="submit">
          <Send size={17} />
          Subscribe
        </button>
      </div>
      {message ? <p className={compact ? "text-sm font-semibold text-white/70" : "mt-3 text-center text-sm font-bold text-[#0b4f4a]"}>{message}</p> : null}
    </form>
  );
}

export function ContactForm() {
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const body = String(form.get("message") ?? "");

    if (!name.trim() || !isEmail(email) || !body.trim()) {
      setMessage("Please complete your name, valid email, and message.");
      return;
    }

    event.currentTarget.reset();
    setMessage("Message sent successfully. Our team will get back to you soon.");
  }

  return (
    <form onSubmit={submit} className="glass-panel rounded-[1.7rem] p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className="label">Full name</span>
          <input name="name" className="input-field" placeholder="M Abdullah Fawad" />
        </label>
        <label>
          <span className="label">Email</span>
          <input name="email" className="input-field" placeholder="you@example.com" />
        </label>
        <label>
          <span className="label">Phone</span>
          <input name="phone" className="input-field" placeholder="+92 300 1234567" />
        </label>
        <label>
          <span className="label">Interest</span>
          <select name="interest" className="input-field">
            <option>Luxury hot tub consultation</option>
            <option>Installation quote</option>
            <option>Service request</option>
          </select>
        </label>
      </div>
      <label className="mt-5 block">
        <span className="label">Message</span>
        <textarea name="message" rows={5} className="input-field resize-none" placeholder="Tell us about your space and timeline." />
      </label>
      <label className="mt-5 flex items-start gap-3 text-sm font-semibold text-[#667085]">
        <input type="checkbox" className="mt-1 accent-[#0f766e]" required />
        I agree to be contacted about HOTSPRING products and installation services.
      </label>
      <button type="submit" className="button-primary mt-6 w-full sm:w-auto">
        <Send size={18} />
        Send message
      </button>
      {message ? <Notice message={message} tone={message.startsWith("Please") ? "error" : "success"} /> : null}
    </form>
  );
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!isEmail(email) || password.length < 6) {
      setMessage("Enter a valid email and a password with at least 6 characters.");
      return;
    }
    setMessage("Login successful. Redirecting to account dashboard in this demo.");
  }

  return (
    <form onSubmit={submit} className="glass-panel rounded-[1.7rem] p-6 sm:p-8">
      <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#171a1f] text-white">
        <Lock size={24} />
      </div>
      <h1 className="text-3xl font-black text-[#171a1f]">Welcome back</h1>
      <p className="mt-2 text-[#667085]">Sign in to manage orders, addresses, and checkout faster.</p>
      <div className="mt-7 grid gap-5">
        <label>
          <span className="label">Email</span>
          <input className="input-field" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </label>
        <label>
          <span className="label">Password</span>
          <PasswordInput id="loginPassword" value={password} onChange={setPassword} placeholder="Enter password" />
        </label>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 text-sm">
        <label className="flex items-center gap-2 font-semibold text-[#667085]">
          <input type="checkbox" className="accent-[#0f766e]" />
          Remember me
        </label>
        <Link href="/forgot-password" className="font-bold text-[#0b4f4a]">Forgot password?</Link>
      </div>
      <button className="button-primary mt-7 w-full" type="submit">Sign in</button>
      <p className="mt-5 text-center text-sm text-[#667085]">
        New here? <Link href="/register" className="font-bold text-[#0b4f4a]">Create account</Link>
      </p>
      {message ? <Notice message={message} tone={message.startsWith("Enter") ? "error" : "success"} /> : null}
    </form>
  );
}

export function RegisterForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const score = passwordScore(password);
  const strength = ["", "Very weak", "Weak", "Fair", "Strong", "Very strong"][score];

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const firstName = String(form.get("firstName") ?? "");
    const email = String(form.get("email") ?? "");

    if (!firstName.trim() || !isEmail(email) || password.length < 8 || password !== confirm) {
      setMessage("Complete the form with a valid email and matching 8 character passwords.");
      return;
    }
    setMessage("Registration successful. Your demo account is ready.");
  }

  return (
    <form onSubmit={submit} className="glass-panel rounded-[1.7rem] p-6 sm:p-8">
      <h1 className="text-3xl font-black text-[#171a1f]">Create account</h1>
      <p className="mt-2 text-[#667085]">Join HOTSPRING for faster checkout and order tracking.</p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label>
          <span className="label">First name</span>
          <input name="firstName" className="input-field" placeholder="M Abdullah" />
        </label>
        <label>
          <span className="label">Last name</span>
          <input name="lastName" className="input-field" placeholder="Fawad" />
        </label>
        <label className="sm:col-span-2">
          <span className="label">Email</span>
          <input name="email" className="input-field" placeholder="you@example.com" />
        </label>
        <label>
          <span className="label">Password</span>
          <PasswordInput id="registerPassword" value={password} onChange={setPassword} />
        </label>
        <label>
          <span className="label">Confirm password</span>
          <PasswordInput id="confirmPassword" value={confirm} onChange={setConfirm} />
        </label>
      </div>
      <div className="mt-4">
        <div className="h-2 overflow-hidden rounded-full bg-[#e5ded2]">
          <div className="h-full rounded-full bg-[#0f766e]" style={{ width: `${score * 20}%` }} />
        </div>
        <p className="mt-2 text-sm font-bold text-[#667085]">Password strength: {strength || "Start typing"}</p>
      </div>
      <label className="mt-5 flex items-start gap-3 text-sm font-semibold text-[#667085]">
        <input type="checkbox" className="mt-1 accent-[#0f766e]" required />
        I agree to HOTSPRING terms and privacy policies.
      </label>
      <button className="button-primary mt-7 w-full" type="submit">Create account</button>
      {message ? <Notice message={message} tone={message.startsWith("Complete") ? "error" : "success"} /> : null}
    </form>
  );
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    setMessage(isEmail(email) ? "Reset link sent. Check your inbox for the next step." : "Please enter a valid email address.");
  }

  return (
    <form onSubmit={submit} className="glass-panel rounded-[1.7rem] p-6 sm:p-8">
      <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f766e] text-white">
        <Mail size={24} />
      </div>
      <h1 className="text-3xl font-black text-[#171a1f]">Forgot password?</h1>
      <p className="mt-2 text-[#667085]">Enter your email and we will send a secure reset link.</p>
      <label className="mt-7 block">
        <span className="label">Email</span>
        <input className="input-field" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
      </label>
      <button className="button-primary mt-7 w-full" type="submit">Send reset link</button>
      {message ? <Notice message={message} tone={message.startsWith("Please") ? "error" : "success"} /> : null}
    </form>
  );
}

export function AddressForm({ type }: { type: "billing" | "shipping" }) {
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fullName = String(form.get("fullName") ?? "");
    const city = String(form.get("city") ?? "");
    const zip = String(form.get("zip") ?? "");
    if (!fullName.trim() || !city.trim() || !/^\d{5}$/.test(zip)) {
      setMessage("Please complete required fields and enter a 5 digit ZIP code.");
      return;
    }
    setMessage(`${type === "billing" ? "Billing" : "Shipping"} address saved successfully.`);
  }

  return (
    <form onSubmit={submit} className="glass-panel rounded-[1.7rem] p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          <span className="label">Full name</span>
          <input name="fullName" className="input-field" defaultValue="M Abdullah Fawad" />
        </label>
        <label>
          <span className="label">Phone</span>
          <input name="phone" className="input-field" defaultValue="+92 300 1234567" />
        </label>
        <label className="sm:col-span-2">
          <span className="label">Address</span>
          <input name="address" className="input-field" defaultValue="House 24, F-8 Markaz" />
        </label>
        <label>
          <span className="label">City</span>
          <input name="city" className="input-field" defaultValue="Islamabad" />
        </label>
        <label>
          <span className="label">ZIP code</span>
          <input name="zip" className="input-field" defaultValue="44000" />
        </label>
        <label>
          <span className="label">Country</span>
          <select name="country" className="input-field" defaultValue="Pakistan">
            <option>Pakistan</option>
            <option>United Arab Emirates</option>
          </select>
        </label>
        <label>
          <span className="label">Province</span>
          <select name="province" className="input-field" defaultValue="Islamabad Capital Territory">
            <option>Islamabad Capital Territory</option>
            <option>Punjab</option>
            <option>Sindh</option>
            <option>Khyber Pakhtunkhwa</option>
          </select>
        </label>
      </div>
      <button className="button-primary mt-7" type="submit">Save address</button>
      {message ? <Notice message={message} tone={message.startsWith("Please") ? "error" : "success"} /> : null}
    </form>
  );
}

export function EditAccountForms() {
  const [message, setMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const score = useMemo(() => passwordScore(newPassword), [newPassword]);

  function saveAccount(event: FormEvent) {
    event.preventDefault();
    setMessage("Account details updated successfully.");
  }

  function savePassword(event: FormEvent) {
    event.preventDefault();
    const valid = currentPassword.length > 0 && newPassword.length >= 8 && newPassword === confirm;
    setMessage(valid ? "Password changed successfully." : "New passwords must match and be at least 8 characters.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={saveAccount} className="glass-panel rounded-[1.7rem] p-6 sm:p-8">
        <h2 className="text-2xl font-black text-[#171a1f]">Profile details</h2>
        <div className="mt-6 grid gap-5">
          <label>
            <span className="label">Name</span>
            <input className="input-field" defaultValue="M Abdullah Fawad" />
          </label>
          <label>
            <span className="label">Email</span>
            <input className="input-field" defaultValue="abdullah@example.com" />
          </label>
          <label>
            <span className="label">Phone</span>
            <input className="input-field" defaultValue="+92 300 1234567" />
          </label>
        </div>
        <button className="button-primary mt-7" type="submit">Save changes</button>
      </form>

      <form onSubmit={savePassword} className="glass-panel rounded-[1.7rem] p-6 sm:p-8">
        <h2 className="text-2xl font-black text-[#171a1f]">Security</h2>
        <div className="mt-6 grid gap-5">
          <label>
            <span className="label">Current password</span>
            <PasswordInput id="currentPassword" value={currentPassword} onChange={setCurrentPassword} />
          </label>
          <label>
            <span className="label">New password</span>
            <PasswordInput id="newPassword" value={newPassword} onChange={setNewPassword} />
          </label>
          <label>
            <span className="label">Confirm new password</span>
            <PasswordInput id="confirmNewPassword" value={confirm} onChange={setConfirm} />
          </label>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e5ded2]">
          <div className="h-full rounded-full bg-[#0f766e]" style={{ width: `${score * 20}%` }} />
        </div>
        <button className="button-primary mt-7" type="submit">Update password</button>
      </form>
      {message ? (
        <div className="lg:col-span-2">
          <Notice message={message} tone={message.startsWith("New") ? "error" : "success"} />
        </div>
      ) : null}
    </div>
  );
}
