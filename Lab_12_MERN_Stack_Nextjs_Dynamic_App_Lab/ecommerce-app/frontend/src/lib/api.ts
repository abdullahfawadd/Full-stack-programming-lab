import type {
  ApiListResponse,
  ApiSingleResponse,
  Product,
  ProductInput,
} from "@/types/product";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type ProductQuery = {
  category?: string;
  featured?: boolean;
  search?: string;
};

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || "Request failed");
  }

  return payload as T;
};

export const getProducts = async (
  query: ProductQuery = {},
): Promise<Product[]> => {
  const params = new URLSearchParams();

  if (query.category) params.set("category", query.category);
  if (query.featured) params.set("featured", "true");
  if (query.search) params.set("search", query.search);

  const suffix = params.toString() ? `?${params.toString()}` : "";
  const response = await request<ApiListResponse<Product>>(
    `/products${suffix}`,
  );

  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await request<ApiSingleResponse<Product>>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (
  product: ProductInput,
): Promise<Product> => {
  const response = await request<ApiSingleResponse<Product>>("/products", {
    method: "POST",
    body: JSON.stringify(product),
  });

  return response.data;
};

export const updateProduct = async (
  id: string,
  product: ProductInput,
): Promise<Product> => {
  const response = await request<ApiSingleResponse<Product>>(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });

  return response.data;
};

export const deleteProduct = async (id: string): Promise<Product> => {
  const response = await request<ApiSingleResponse<Product>>(`/products/${id}`, {
    method: "DELETE",
  });

  return response.data;
};
