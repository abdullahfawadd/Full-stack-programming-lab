import { API_URL } from "@/lib/config";
import type {
  ApiListResponse,
  ApiSingleResponse,
  Customer,
  CustomerInput,
  Invoice,
  ServiceLine,
  User,
} from "@/types/crm";

type RequestOptions = RequestInit & {
  skipJson?: boolean;
};

export class AuthExpiredError extends Error {
  constructor(message = "Session expired. Please login again.") {
    super(message);
    this.name = "AuthExpiredError";
  }
}

export const isAuthExpiredError = (error: unknown) => error instanceof AuthExpiredError;

const request = async <T>(path: string, init: RequestOptions = {}): Promise<T> => {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  const payload = init.skipJson ? null : await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.message || "Request failed";

    if (
      response.status === 401 &&
      typeof window !== "undefined" &&
      !path.startsWith("/auth/login") &&
      !path.startsWith("/auth/register") &&
      !path.startsWith("/auth/logout")
    ) {
      void fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      window.dispatchEvent(
        new CustomEvent("crm:auth-expired", {
          detail: message,
        }),
      );

      throw new AuthExpiredError(message);
    }

    throw new Error(message);
  }

  return payload as T;
};

export const login = (email: string, password: string) =>
  request<ApiSingleResponse<User>>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const register = (name: string, email: string, password: string) =>
  request<ApiSingleResponse<User>>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

export const logout = () =>
  request<{ message: string }>("/auth/logout", { method: "POST" });

export const getMe = () => request<ApiSingleResponse<User>>("/auth/me");

export const getCustomers = (query: { search?: string; status?: string } = {}) => {
  const params = new URLSearchParams();
  if (query.search) params.set("search", query.search);
  if (query.status && query.status !== "All") params.set("status", query.status);
  const suffix = params.toString() ? `?${params.toString()}` : "";
  return request<ApiListResponse<Customer>>(`/customers${suffix}`);
};

export const getCustomer = (id: string) =>
  request<ApiSingleResponse<Customer>>(`/customers/${id}`);

export const createCustomer = (customer: CustomerInput) =>
  request<ApiSingleResponse<Customer>>("/customers", {
    method: "POST",
    body: JSON.stringify(customer),
  });

export const updateCustomer = (id: string, customer: CustomerInput) =>
  request<ApiSingleResponse<Customer>>(`/customers/${id}`, {
    method: "PUT",
    body: JSON.stringify(customer),
  });

export const deleteCustomer = (id: string) =>
  request<ApiSingleResponse<Customer>>(`/customers/${id}`, {
    method: "DELETE",
  });

export const getInvoices = () => request<ApiListResponse<Invoice>>("/invoices");

export const createInvoice = (payload: {
  customerId: string;
  services: ServiceLine[];
  summary: string;
  dueDate: string;
  status: "Draft" | "Sent" | "Paid";
}) =>
  request<ApiSingleResponse<Invoice>>("/invoices", {
    method: "POST",
    body: JSON.stringify(payload),
  });
