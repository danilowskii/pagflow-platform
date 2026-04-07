type OrderStatus = "PENDING" | "PAID" | "FAILED";

export interface Orders {
  id: string;
  customer_id: string;
  product_id: string;
  amount_cents: number;
  status: OrderStatus;
}
