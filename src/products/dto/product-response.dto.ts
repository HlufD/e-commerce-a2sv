import { ApiProperty } from "@nestjs/swagger";

class CreateProductResponseDto {
  @ApiProperty({ example: 201 })
  status: number;

  @ApiProperty({ example: "Product created successfully" })
  message: string;

  @ApiProperty({
    example: {
      id: "dc8bc07c-7e6b-4e76-977f-86e21996d1d8",
      name: "Smart Fitness Watch",
      description:
        "Water-resistant smartwatch with heart rate monitor, sleep tracking, and step counter\n",
      price: 170,
      stock: 200,
      category: "Wearables",
      imageUrl:
        "http://localhost:3000/uploads/products/1762887333188-284392757.JPG",
      userId: "ad8d5c83-2f6f-43e8-8f2d-eb26ce53d28c",
      createdAt: "2025-11-11T18:55:33.210Z",
      updatedAt: "2025-11-11T18:55:33.210Z",
    },
  })
  data: any;
}

class GetProductDataDto {
  @ApiProperty({ example: "dc8bc07c-7e6b-4e76-977f-86e21996d1d8" })
  id: string;

  @ApiProperty({ example: "Smart Fitness Watch" })
  name: string;

  @ApiProperty({
    example:
      "Water-resistant smartwatch with heart rate monitor, sleep tracking, and step counter\n",
  })
  description: string;

  @ApiProperty({ example: 170 })
  price: number;

  @ApiProperty({ example: 200 })
  stock: number;

  @ApiProperty({ example: "Wearables" })
  category: string;

  @ApiProperty({ example: null, nullable: true })
  imageUrl: string | null;

  @ApiProperty({ example: "ad8d5c83-2f6f-43e8-8f2d-eb26ce53d28c" })
  userId: string;

  @ApiProperty({ example: "2025-11-11T18:55:33.210Z" })
  createdAt: string;

  @ApiProperty({ example: "2025-11-11T18:55:33.210Z" })
  updatedAt: string;
}

class GetProductsResponseDto {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: "Products fetched successfully" })
  message: string;

  @ApiProperty({ type: [GetProductDataDto] })
  data: GetProductDataDto[];

  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ example: 10 })
  pageSize: number;

  @ApiProperty({ example: 1 })
  totalPages: number;

  @ApiProperty({ example: 5 })
  totalItems: number;
}

class UpdateProductResponseDto {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: "Product updated successfully" })
  message: string;

  @ApiProperty({
    example: {
      id: "dc8bc07c-7e6b-4e76-977f-86e21996d1d8",
      name: "New Product",
      description: "This is updated product",
      price: 120,
      stock: 100,
      category: "New Category",
      imageUrl:
        "http://localhost:3000/uploads/products/1762887614184-569728966.JPG",
      userId: "ad8d5c83-2f6f-43e8-8f2d-eb26ce53d28c",
      createdAt: "2025-11-11T18:55:33.210Z",
      updatedAt: "2025-11-11T19:00:14.196Z",
    },
  })
  data: any;
}

class DeleteProductResponseDto {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: "Product deleted successfully" })
  message: string;

  @ApiProperty({
    example: null,
    description: "No data is returned when a product is deleted",
  })
  data: any;
}

class NotFoundProductResponseDto {
  @ApiProperty({ example: 404 })
  status: number;

  @ApiProperty({ example: "Product not found" })
  message: string;

  @ApiProperty({
    example: null,
    description: "No data is returned when the product is not found",
  })
  data: any;
}

class ProductValidationErrorResponseDto {
  @ApiProperty({ example: 400 })
  status: number;

  @ApiProperty({
    example: ["Category is required"],
    description: "Array of validation error messages",
  })
  message: string[];

  @ApiProperty({
    example: null,
    description: "No data is returned when validation fails",
  })
  data: any;
}

export {
  CreateProductResponseDto,
  ProductValidationErrorResponseDto,
  GetProductDataDto,
  GetProductsResponseDto,
  UpdateProductResponseDto,
  DeleteProductResponseDto,
  NotFoundProductResponseDto,
};
