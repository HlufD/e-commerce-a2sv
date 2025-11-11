import { ApiResponseProperty } from "@nestjs/swagger";
import { Product } from "src/products/domain/entities/product.entity";

export class Order {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  userId: string;

  @ApiResponseProperty()
  description: string;

  @ApiResponseProperty()
  totalPrice: number;

  @ApiResponseProperty()
  status: string;

  @ApiResponseProperty({ type: () => [Product] })
  products: Product[];

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;
}
