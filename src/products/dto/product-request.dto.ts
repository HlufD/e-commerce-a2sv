import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsInt,
  Min,
  IsOptional,
  IsUUID,
  Length,
} from "class-validator";

class CreateProductDto {
  @ApiProperty({ example: "Smart Fitness Watch" })
  @IsString({ message: "Product name must be a valid string" })
  @IsNotEmpty({ message: "Product name is required" })
  @Length(3, 100, {
    message: "Product name must be between 3 and 100 characters",
  })
  name: string;

  @ApiProperty({
    example:
      "Water-resistant smartwatch with heart rate monitor, sleep tracking, and step counter",
  })
  @IsString({ message: "Product description must be a valid string" })
  @IsNotEmpty({ message: "Product description is required" })
  @Length(10, 1000, {
    message: "Product description must be at least 10 characters long",
  })
  description: string;

  @ApiProperty({ example: 170 })
  @Type(() => Number)
  @IsNumber({}, { message: "Price must be a valid number" })
  @IsPositive({ message: "Price must be greater than zero" })
  price: number;

  @ApiProperty({ example: 200 })
  @Type(() => Number)
  @IsInt({ message: "Stock must be an integer" })
  @Min(0, { message: "Stock cannot be negative" })
  stock: number;

  @ApiProperty({ example: "Wearables" })
  @IsString({ message: "Category must be a valid string" })
  @IsNotEmpty({ message: "Category is required" })
  category: string;

  @ApiProperty({
    type: "string",
    format: "binary",
    required: false,
    example: null,
  })
  @IsOptional()
  imageUrl?: any;
}

class UpdateProductDto {
  @ApiPropertyOptional({
    example: "Updated Product Name",
    description: "Name of the product",
  })
  @IsOptional()
  @IsString({ message: "Product name must be a valid string" })
  name?: string;

  @ApiPropertyOptional({
    example: "Updated product description",
    description: "Description of the product",
  })
  @IsOptional()
  @IsString({ message: "Product description must be a valid string" })
  description?: string;

  @ApiPropertyOptional({ example: 150, description: "Price of the product" })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { message: "Price must be a valid number" })
  @IsPositive({ message: "Price must be greater than zero" })
  price?: number;

  @ApiPropertyOptional({
    example: 120,
    description: "Stock quantity of the product",
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: "Stock must be an integer" })
  @Min(0, { message: "Stock cannot be negative" })
  stock?: number;

  @ApiPropertyOptional({
    example: "Wearables",
    description: "Category of the product",
  })
  @IsOptional()
  @IsString({ message: "Category must be a valid string" })
  category?: string;

  @ApiPropertyOptional({
    type: "string",
    format: "binary",
    required: false,
    example: null,
    description: "Optional product image",
  })
  @IsOptional()
  imageUrl?: any;
}

class DeleteProductDto {
  @IsUUID("4", { message: "Product ID must be a valid UUID" })
  @IsNotEmpty({ message: "Product ID is required" })
  id: string;
}

class GetProductDto {
  @IsUUID("4", { message: "Product ID must be a valid UUID" })
  @IsNotEmpty({ message: "Product ID is required" })
  id: string;
}

class GetProductsDto {
  @ApiPropertyOptional({
    example: 1,
    description: "Page number for pagination",
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Page must be an integer" })
  @Min(1, { message: "Page must be at least 1" })
  page: number = 1;

  @ApiPropertyOptional({ example: 10, description: "Number of items per page" })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Limit must be an integer" })
  @Min(1, { message: "Limit must be at least 1" })
  limit: number = 10;

  @ApiPropertyOptional({
    example: "watch",
    description: "Search term for filtering products",
  })
  @IsOptional()
  @IsString({ message: "Search must be a string" })
  search?: string;
}
export { CreateProductDto, UpdateProductDto, GetProductsDto };
