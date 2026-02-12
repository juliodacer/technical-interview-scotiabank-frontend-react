export interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
  price: string;
  reg_date: Date;
  mod_date: Date | null;
  state: boolean;
  category: string;
}
