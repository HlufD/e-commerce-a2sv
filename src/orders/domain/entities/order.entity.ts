import { Product } from "src/products/domain/entities/product.entity";

export class Order {
  id: string;
  userId: string;
  description?: string | null;
  totalPrice: number;
  status: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}
