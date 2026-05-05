import { axiosClient } from "./axiosClient";
import type { ApiListResponse, ApiSingleResponse, Product } from "@/types/product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosClient.get<ApiListResponse<Product>>("/products");
  return response.data.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await axiosClient.get<ApiSingleResponse<Product>>(`/products/${id}`);
  return response.data.data;
};
