import { applyDecorators } from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";

import {
  CreateOrderResponseDto,
  GetOrdersResponseDto,
  OrderNotFoundResponseDto,
  UnauthorizedResponseDto,
  OrderValidationErrorResponseDto,
} from "../dto/order-response.dto";
import { CreateOrderDto } from "../dto/order-request.dto";

export function ApiCreateOrder() {
  return applyDecorators(
    ApiBearerAuth("JWT-auth"),
    ApiOperation({ summary: "Create a new order" }),
    ApiBody({ type: CreateOrderDto, description: "Order payload" }),
    ApiResponse({
      status: 201,
      description: "Order created successfully",
      type: CreateOrderResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: "Product not found",
      type: OrderNotFoundResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: "Unauthorized",
      type: UnauthorizedResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: "Validation error",
      type: OrderValidationErrorResponseDto,
    })
  );
}

export function ApiGetOrders() {
  return applyDecorators(
    ApiBearerAuth("JWT-auth"),
    ApiOperation({ summary: "Get orders for the logged-in user" }),
    ApiResponse({
      status: 200,
      description: "Orders retrieved successfully",
      type: GetOrdersResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: "Unauthorized",
      type: UnauthorizedResponseDto,
    })
  );
}
