import { User } from "src/auth/domain/entities/user.entity";

export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string | null;
  userId: string;
  user?: User;
  orders?: [];
}
