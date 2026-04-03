export interface Customer {
  id: string;
  name: string;
  email: string;
  password_hash: string;
}

export type SafeCustomer = Omit<Customer, "password_hash">;
