export type OrderSource =
  | "cart"
  | "buynow";

// ================= PAYMENT =================

export enum PaymentMethod {

  Card = 1,

  Cash = 2,
}

// ================= ORDER STATUS =================

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Cancelled";

// ================= PLACE ORDER =================

export interface PlaceOrderPayload {

  address: string;

  source: OrderSource;

  paymentMethodId: PaymentMethod;

  requestId: string;

  productId?: number;

  quantity?: number;
}

// ================= ORDER ITEM =================

export interface OrderItem {

  name: string;

  quantity: number;

  price: number;
}

// ================= ORDER =================

export interface Order {

  id: number;

  totalPrice: number;

  tax: number;

  shippingCost: number;

  paymentMethod: string;

  status: OrderStatus;

  createdAt: string;
}

// ================= ORDER DETAILS =================

export interface OrderDetails {

  id: number;

  totalPrice: number;

  orderStatus: OrderStatus;

  paymentStatus: string;

  paymentMethod: string;

  createdAt: string;

  items: OrderItem[];
}