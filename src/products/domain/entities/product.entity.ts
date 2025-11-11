import { User } from "src/auth/domain/entities/user.entity";

export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  userId: string;
  user?: User;
  orders?: [];
}
