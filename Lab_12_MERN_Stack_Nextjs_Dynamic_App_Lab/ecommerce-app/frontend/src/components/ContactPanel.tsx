"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

export function ContactPanel() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-line bg-surface p-5 md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Name
          <input
            required
            placeholder="M Abdullah"
            className="focus-ring h-11 rounded-lg border border-line bg-background px-3 text-sm font-normal"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Email
          <input
            required
            type="email"
            placeholder="abdullah@example.com"
            className="focus-ring h-11 rounded-lg border border-line bg-background px-3 text-sm font-normal"
          />
        </label>
      </div>
      <label className="mt-4 grid gap-2 text-sm font-medium">
        Message
        <textarea
          required
          rows={6}
          placeholder="Tell us what you are looking for"
          className="focus-ring resize-none rounded-lg border border-line bg-background px-3 py-3 text-sm font-normal"
        />
      </label>
      <button
        type="submit"
        className="focus-ring mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-semibold text-white"
      >
        <Send size={17} />
        Send message
      </button>
      {sent && (
        <p className="mt-4 rounded-lg border border-line bg-background p-3 text-sm text-sage-dark">
          Message saved in the demo interface.
        </p>
      )}
    </form>
  );
}
