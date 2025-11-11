import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

class Product {
  @IsString({ message: "Product ID must be a valid UUID" })
  @IsNotEmpty({ message: "Product ID is required" })
  id: string;

  @IsInt({ message: "Quantity must be an integer" })
  @Min(1, { message: "Quantity must be at least 1" })
  quantity: number;
}

class CreateOrderDto {
  @IsArray({ message: "Order must be an array" })
  @ArrayMinSize(1, { message: "At least one product is required in the order" })
  @ValidateNested({ each: true })
  @Type(() => Product)
  products: Product[];
}

class GetOrdersDto {
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

  @IsOptional()
  @IsString({ message: "Status must be a string" })
  status?: string;
}

export { CreateOrderDto, GetOrdersDto };
