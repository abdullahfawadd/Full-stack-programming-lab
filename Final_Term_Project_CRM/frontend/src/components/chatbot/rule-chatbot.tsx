"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, CornerDownLeft, MessageSquare, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { getCustomers, isAuthExpiredError } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  role: "user" | "bot";
  text: string;
};

const starterMessages: Message[] = [
  {
    role: "bot",
    text: "I am Vantage Assist. Try: help, customers, add customer, invoice, calendar, reports.",
  },
];

export function RuleChatbot() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(starterMessages);

  const commandHint = useMemo(
    () => ["help", "customers", "add customer", "invoice", "calendar", "reports"],
    [],
  );

  const replyToCommand = async (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase();

    if (!command) return;

    if (command === "help") {
      setMessages((current) => [
        ...current,
        {
          role: "bot",
          text: "Commands: customers shows records, add customer opens the form, invoice opens invoice studio, calendar opens the schedule, reports opens visual analytics, help repeats this menu.",
        },
      ]);
      return;
    }

    if (command.includes("customer") && command.includes("add")) {
      router.push("/dashboard/customers/new");
      setMessages((current) => [
        ...current,
        { role: "bot", text: "Opening the add customer workflow." },
      ]);
      return;
    }

    if (command.includes("invoice")) {
      router.push("/dashboard/invoices");
      setMessages((current) => [
        ...current,
        { role: "bot", text: "Opening invoice generation." },
      ]);
      return;
    }

    if (command.includes("calendar") || command.includes("schedule")) {
      router.push("/dashboard/calendar");
      setMessages((current) => [
        ...current,
        { role: "bot", text: "Opening the relationship calendar." },
      ]);
      return;
    }

    if (command.includes("report") || command.includes("analytics")) {
      router.push("/dashboard/reports");
      setMessages((current) => [
        ...current,
        { role: "bot", text: "Opening visual reports." },
      ]);
      return;
    }

    if (command.includes("customer")) {
      try {
        const response = await getCustomers();
        const names = response.data
          .slice(0, 5)
          .map((customer) => `${customer.name} (${customer.status})`)
          .join(", ");
        setMessages((current) => [
          ...current,
          {
            role: "bot",
            text: names
              ? `Top customers: ${names}.`
              : "No customers found yet. Run the seed script first.",
          },
        ]);
      } catch (error) {
        if (isAuthExpiredError(error)) return;
        toast.error(error instanceof Error ? error.message : "Could not fetch customers");
      }
      return;
    }

    setMessages((current) => [
      ...current,
      {
        role: "bot",
        text: "I only respond to predefined commands. Type help to see them.",
      },
    ]);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = input;
    setInput("");
    setMessages((current) => [...current, { role: "user", text: command }]);
    await replyToCommand(command);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-[min(calc(100vw-2rem),390px)] overflow-hidden rounded-[1.5rem] border border-black/10 bg-white/95 text-[#151820] shadow-[0_28px_80px_rgb(30_34_44/0.22)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b premium-border px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-xl bg-black text-white">
                <Bot className="size-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Vantage Assist</p>
                <p className="text-xs text-muted-foreground">Rule-based commands only</p>
              </div>
            </div>
            <Button size="icon-sm" variant="ghost" onClick={() => setOpen(false)} aria-label="Close chatbot">
              <X className="size-4" />
            </Button>
          </div>
          <ScrollArea className="h-72 px-4 py-3">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={
                    message.role === "user"
                      ? "ml-auto max-w-[82%] rounded-2xl bg-primary px-3 py-2 text-sm text-primary-foreground"
                      : "max-w-[86%] rounded-2xl border border-black/10 bg-[#f2f4f6] px-3 py-2 text-sm text-black/62"
                  }
                >
                  {message.text}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t premium-border p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {commandHint.map((command) => (
                <button
                  key={command}
                  type="button"
                  onClick={() => {
                    setInput(command);
                  }}
                  className="rounded-full border border-black/10 bg-[#f2f4f6] px-2 py-1 text-xs text-black/52 transition hover:text-black"
                >
                  {command}
                </button>
              ))}
            </div>
            <form className="flex gap-2" onSubmit={onSubmit}>
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type a command"
                className="h-9"
              />
              <Button size="icon-lg" type="submit" aria-label="Send command">
                <CornerDownLeft className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
      <Button
        className="h-12 rounded-full bg-black px-5 text-white shadow-[0_22px_60px_rgb(30_34_44/0.24)] hover:bg-black/85"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <Sparkles className="size-4" /> : <MessageSquare className="size-4" />}
        Assistant
      </Button>
    </div>
  );
}
