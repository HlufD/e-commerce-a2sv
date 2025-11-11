// src/auth/decorators/swagger.decorators.ts
import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from "@nestjs/swagger";
import {
  ErrorResponseDto,
  LoginResponseDto,
  NotFoundErrorResponseDto,
  RegisterResponseDto,
  ValidationErrorResponseDto,
} from "../dto/auth-response.dto";
import { LoginDto, SignupDto } from "../dto/auth-request.dto";

function ApiSignup() {
  return applyDecorators(
    ApiOperation({ summary: "Register a new user" }),
    ApiBody({ type: SignupDto, description: "Signup payload" }),
    ApiResponse({
      status: 201,
      description: "User successfully registered.",
      type: RegisterResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: "Validation error",
      type: ValidationErrorResponseDto,
    })
  );
}

function ApiLogin() {
  return applyDecorators(
    ApiOperation({ summary: "User login" }),
    ApiBody({ type: LoginDto, description: "Login payload" }),
    ApiResponse({
      status: 200,
      description: "User successfully logged in",
      type: LoginResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: "Invalid credentials",
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: "Validation error",
      type: ValidationErrorResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: "User not found",
      type: NotFoundErrorResponseDto,
    })
  );
}

function ApiAuthTag() {
  return applyDecorators(ApiTags("auth"));
}

export { ApiSignup, ApiLogin, ApiAuthTag };
