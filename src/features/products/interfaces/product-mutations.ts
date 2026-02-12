export interface CreateProductRequest {
  code: string;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  state?: boolean;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: number;
  state?: boolean;
  code?: string;
}

export interface ProductFormData {
  code: string;
  name: string;
  description: string;
  price: string;
  categoryId: number;
  state: boolean;
}

export interface FormErrors {
  code?: string;
  name?: string;
  price?: string;
  categoryId?: string;
  description?: string;
}
