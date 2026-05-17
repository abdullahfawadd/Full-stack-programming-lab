export type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number | null;
  image: string;
  gallery: string[];
  description: string;
  details: string[];
  material: string;
  dimensions: string;
  care: string;
  stock: number;
  rating: number;
  featured: boolean;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type ProductInput = Omit<Product, "_id" | "createdAt" | "updatedAt">;

export type ApiListResponse<T> = {
  success: boolean;
  count: number;
  data: T[];
};

export type ApiSingleResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};
