export type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiListResponse<T> = {
  success: boolean;
  count: number;
  data: T[];
};

export type ApiSingleResponse<T> = {
  success: boolean;
  data: T;
};
