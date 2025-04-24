// Represents a single purchase record in the history
export type PurchaseStatus = "Delivered";

export interface PurchaseRecord {
  id: string;
  createdAt: string;
  totalPrice: number;
  status: PurchaseStatus;
  address: string;
  name: string;
  phone: string;
  email: string;
}

// Represents the data needed to make a purchase
export interface cornPurchasePayload {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  totalPrice: number;
  status: PurchaseStatus;
}
