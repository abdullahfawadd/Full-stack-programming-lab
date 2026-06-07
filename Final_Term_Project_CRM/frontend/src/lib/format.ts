export const currency = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number) => currency.format(value);

export const formatDate = (value: string | Date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(value));

export const formatInputDate = (value?: string | Date) => {
  const date = value ? new Date(value) : new Date();
  return date.toISOString().slice(0, 10);
};

export const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
