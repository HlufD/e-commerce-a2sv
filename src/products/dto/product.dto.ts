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
  @IsString({ message: "Product name must be a valid string" })
  @IsNotEmpty({ message: "Product name is required" })
  @Length(3, 100, {
    message: "Product name must be between 3 and 100 characters",
  })
  name: string;

  @IsString({ message: "Product description must be a valid string" })
  @IsNotEmpty({ message: "Product description is required" })
  @Length(10, 1000, {
    message: "Product description must be at least 10 characters long",
  })
  description: string;

  @Type(() => Number)
  @IsNumber({}, { message: "Price must be a valid number" })
  @IsPositive({ message: "Price must be greater than zero" })
  price: number;

  @Type(() => Number)
  @IsInt({ message: "Stock must be an integer" })
  @Min(0, { message: "Stock cannot be negative" })
  stock: number;

  @IsString({ message: "Category must be a valid string" })
  @IsNotEmpty({ message: "Category is required" })
  category: string;
}

class UpdateProductDto {
  @IsOptional()
  @IsString({ message: "Product name must be a valid string" })
  name?: string;

  @IsOptional()
  @IsString({ message: "Product description must be a valid string" })
  description?: string;
  @Type(() => Number)
  @IsOptional()
  @IsNumber({}, { message: "Price must be a valid number" })
  @IsPositive({ message: "Price must be greater than zero" })
  price?: number;

  @Type(() => Number)
  @IsOptional()
  @IsInt({ message: "Stock must be an integer" })
  @Min(0, { message: "Stock cannot be negative" })
  stock?: number;

  @IsOptional()
  @IsString({ message: "Category must be a valid string" })
  category?: string;
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
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Page must be an integer" })
  @Min(1, { message: "Page must be at least 1" })
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Limit must be an integer" })
  @Min(1, { message: "Limit must be at least 1" })
  limit: number = 10;

  @IsOptional()
  @IsString({ message: "Search must be a string" })
  search?: string;
}

export { CreateProductDto, UpdateProductDto, GetProductsDto };
