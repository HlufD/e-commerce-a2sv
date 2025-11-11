import { applyDecorators } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { CreateProductDto, UpdateProductDto } from "../dto/product-request.dto";
import {
  CreateProductResponseDto,
  DeleteProductResponseDto,
  GetProductsResponseDto,
  NotFoundProductResponseDto,
  ProductValidationErrorResponseDto,
} from "../dto/product-response.dto";
import { UnauthorizedResponseDto } from "src/orders/dto/order-response.dto";

function ApiCreateProduct() {
  return applyDecorators(
    ApiBearerAuth("JWT-auth"),
    ApiOperation({ summary: "Create a new product" }),
    ApiConsumes("multipart/form-data"),
    ApiBody({
      description: "Product payload with optional image",
      type: CreateProductDto,
    }),
    ApiResponse({
      status: 201,
      description: "Product created successfully",
      type: CreateProductResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: "Unauthorized",
      type: UnauthorizedResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: "Validation error",
      type: ProductValidationErrorResponseDto,
    })
  );
}

function ApiGetProducts() {
  return applyDecorators(
    ApiBearerAuth("JWT-auth"),
    ApiOperation({ summary: "Fetch products with pagination" }),
    ApiResponse({
      status: 200,
      description: "Products fetched successfully",
      type: GetProductsResponseDto,
    })
  );
}

function ApiUpdateProduct() {
  return applyDecorators(
    ApiBearerAuth("JWT-auth"),
    ApiOperation({ summary: "Update an existing product" }),
    ApiConsumes("multipart/form-data"),
    ApiBody({
      description: "Product payload with optional image",
      type: UpdateProductDto,
    }),
    ApiResponse({
      status: 200,
      description: "Product updated successfully",
      type: CreateProductResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: "Unauthorized",
      type: UnauthorizedResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: "Product not found",
      type: NotFoundProductResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: "Validation error",
      type: ProductValidationErrorResponseDto,
    })
  );
}

function ApiDeleteProduct() {
  return applyDecorators(
    ApiBearerAuth("JWT-auth"),
    ApiOperation({ summary: "Delete a product by ID" }),
    ApiResponse({
      status: 200,
      description: "Product deleted successfully",
      type: DeleteProductResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: "Unauthorized",
      type: UnauthorizedResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: "Product not found",
      type: NotFoundProductResponseDto,
    })
  );
}

function ApiGetProduct() {
  return applyDecorators(
    ApiBearerAuth("JWT-auth"),
    ApiOperation({ summary: "Get a product by ID" }),
    ApiResponse({
      status: 200,
      description: "Product fetched successfully",
      type: GetProductsResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: "Product not found",
      type: NotFoundProductResponseDto,
    })
  );
}

export {
  ApiCreateProduct,
  ApiGetProducts,
  ApiUpdateProduct,
  ApiDeleteProduct,
  ApiGetProduct,
};
