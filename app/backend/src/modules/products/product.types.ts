export interface Product {
  id: string;
  name: string;
  description: string;
  price_cents: Number;
  currency: string;
}

export interface ProductDB {
  id: string;
  name: string;
  description: string;
  price_cents: Number;
  active: boolean;
  currency: string;
  created_at: string;
  updated_at: string;
}
