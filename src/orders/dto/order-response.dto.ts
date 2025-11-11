import { ApiProperty } from "@nestjs/swagger";

class ProductResponseDto {
  @ApiProperty({ example: "dc8bc07c-7e6b-4e76-977f-86e21996d1d8" })
  id: string;

  @ApiProperty({ example: "New Product" })
  name: string;

  @ApiProperty({ example: "This is updated product" })
  description: string;

  @ApiProperty({ example: 120 })
  price: number;

  @ApiProperty({ example: 90 })
  stock: number;

  @ApiProperty({ example: "New Category" })
  category: string;

  @ApiProperty({ example: null, nullable: true })
  imageUrl: string | null;

  @ApiProperty({ example: "ad8d5c83-2f6f-43e8-8f2d-eb26ce53d28c" })
  userId: string;

  @ApiProperty({ example: "2025-11-11T18:55:33.210Z" })
  createdAt: string;

  @ApiProperty({ example: "2025-11-11T19:40:24.179Z" })
  updatedAt: string;
}

class OrderDataDto {
  @ApiProperty({ example: "490411d4-0819-4291-9e8f-641c3e011213" })
  id: string;

  @ApiProperty({ example: "0cbb2fb0-ae8e-47a4-95e3-8b7441312856" })
  userId: string;

  @ApiProperty({ example: "This is a new order" })
  description: string;

  @ApiProperty({ example: 1200 })
  totalPrice: number;

  @ApiProperty({ example: "PENDING" })
  status: string;

  @ApiProperty({ example: "2025-11-11T19:40:24.182Z" })
  createdAt: string;

  @ApiProperty({ example: "2025-11-11T19:40:24.182Z" })
  updatedAt: string;

  @ApiProperty({ type: [ProductResponseDto] })
  products: ProductResponseDto[];
}

class CreateOrderResponseDto {
  @ApiProperty({ example: 201 })
  status: number;

  @ApiProperty({ example: "Order created successfully" })
  message: string;

  @ApiProperty({
    type: OrderDataDto,
    example: {
      id: "490411d4-0819-4291-9e8f-641c3e011213",
      userId: "0cbb2fb0-ae8e-47a4-95e3-8b7441312856",
      description: "This is a new order",
      totalPrice: 1200,
      status: "PENDING",
      createdAt: "2025-11-11T19:40:24.182Z",
      updatedAt: "2025-11-11T19:40:24.182Z",
      products: [
        {
          id: "dc8bc07c-7e6b-4e76-977f-86e21996d1d8",
          name: "New Product",
          description: "This is updated product",
          price: 120,
          stock: 90,
          category: "New Category",
          imageUrl: null,
          userId: "ad8d5c83-2f6f-43e8-8f2d-eb26ce53d28c",
          createdAt: "2025-11-11T18:55:33.210Z",
          updatedAt: "2025-11-11T19:40:24.179Z",
        },
      ],
    },
  })
  data: OrderDataDto;
}

class OrderNotFoundResponseDto {
  @ApiProperty({ example: 404 })
  status: number;

  @ApiProperty({
    example: "Product with id dc8bc07c-7e6b-4e76-977f-86e21996d1d7 not found",
  })
  message: string;

  @ApiProperty({ example: null, nullable: true })
  data: any;
}

class UnauthorizedResponseDto {
  @ApiProperty({ example: 401 })
  status: number;

  @ApiProperty({ example: "Authorization token is missing" })
  message: string;

  @ApiProperty({ example: null, nullable: true })
  data: any;
}

class GetOrdersResponseDto {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: "Orders retrieved successfully" })
  message: string;

  @ApiProperty({
    type: [OrderDataDto],
    example: [
      {
        id: "319c9227-b1b2-474a-a8e6-8eeae0644709",
        userId: "0cbb2fb0-ae8e-47a4-95e3-8b7441312856",
        description: "This is a new order",
        totalPrice: 1700,
        status: "PENDING",
        createdAt: "2025-11-11T19:57:48.468Z",
        updatedAt: "2025-11-11T19:57:48.468Z",
        products: [
          {
            id: "93f3fc10-9dc5-4d6a-a2a7-ae2ab8527d7e",
            name: "Smart Fitness Watch",
            description:
              "Water-resistant smartwatch with heart rate monitor, sleep tracking, and step counter",
            price: 170,
            stock: 190,
            category: "Wearables",
            imageUrl: null,
            userId: "ad8d5c83-2f6f-43e8-8f2d-eb26ce53d28c",
            createdAt: "2025-11-11T18:50:11.888Z",
            updatedAt: "2025-11-11T19:57:48.463Z",
          },
        ],
      },
    ],
  })
  data: OrderDataDto[];
}

class OrderValidationErrorResponseDto {
  @ApiProperty({ example: 400 })
  status: number;

  @ApiProperty({
    example: [
      "products.0.Quantity must be at least 1",
      "products.0.Quantity must be an integer",
    ],
  })
  message: string[];

  @ApiProperty({ example: null, nullable: true })
  data: any;
}

export {
  CreateOrderResponseDto,
  OrderNotFoundResponseDto,
  UnauthorizedResponseDto,
  GetOrdersResponseDto,
  OrderValidationErrorResponseDto,
};
