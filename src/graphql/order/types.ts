export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export interface CreateOrderItemBody {
  name: string;
  quantity: number;
  price: bigint;
  unit: string;
  tags: string[];
}
