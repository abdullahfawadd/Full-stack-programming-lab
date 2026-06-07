export type Status = "Lead" | "Active" | "Inactive";
export type InvoiceStatus = "Draft" | "Sent" | "Paid";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  title: string;
};

export type Customer = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: Status;
  source: string;
  value: number;
  owner: string;
  lastContacted: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type CustomerInput = Omit<Customer, "_id" | "createdAt" | "updatedAt">;

export type ServiceLine = {
  description: string;
  quantity: number;
  rate: number;
};

export type Invoice = {
  _id: string;
  invoiceNumber: string;
  customer: Customer;
  services: ServiceLine[];
  summary: string;
  invoiceDate: string;
  dueDate: string;
  total: number;
  status: InvoiceStatus;
  createdAt: string;
  updatedAt: string;
};

export type ApiListResponse<T> = {
  data: T[];
};

export type ApiSingleResponse<T> = {
  data: T;
};
