import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
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
  @ApiProperty({
    example: [
      { id: "dc8bc07c-7e6b-4e76-977f-86e21996d1d8", quantity: 2 },
      { id: "a123bc07c-4e76-977f-86e2-1996d1d8e76", quantity: 1 },
    ],
  })
  @IsArray({ message: "Order must be an array" })
  @ArrayMinSize(1, { message: "At least one product is required in the order" })
  @ValidateNested({ each: true })
  @Type(() => Product)
  products: Product[];
}

class GetOrdersDto {
  @ApiPropertyOptional({
    example: 1,
    description: "Page number for pagination",
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Page must be an integer" })
  @Min(1, { message: "Page must be at least 1" })
  page: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: "Number of orders per page",
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Limit must be an integer" })
  @Min(1, { message: "Limit must be at least 1" })
  limit: number = 10;

  @ApiPropertyOptional({
    example: "Smart Watch",
    description: "Search keyword for orders",
  })
  @IsOptional()
  @IsString({ message: "Search must be a string" })
  search?: string;
}

export { CreateOrderDto, GetOrdersDto };
