import { ApiProperty } from "@nestjs/swagger";

class LoginResponseDataDto {
  @ApiProperty({ example: "ad8d5c83-2f6f-43e8-8f2d-eb26ce53d28c" })
  id: string;

  @ApiProperty({ example: null, nullable: true })
  username: string | null;

  @ApiProperty({ example: "hanna@gmail.com" })
  email: string;

  @ApiProperty({ example: "ADMIN" })
  role: string;

  @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." })
  token: string;
}

class LoginResponseDto {
  @ApiProperty({ example: 200 })
  status: number;

  @ApiProperty({ example: "Login Successfully" })
  message: string;

  @ApiProperty({ type: LoginResponseDataDto })
  data: LoginResponseDataDto;
}

class RegisterResponseDataDto {
  @ApiProperty({ example: "ad8d5c83-2f6f-43e8-8f2d-eb26ce53d28c" })
  id: string;

  @ApiProperty({ example: null, nullable: true })
  username: string | null;

  @ApiProperty({ example: "hanna@gmail.com" })
  email: string;

  @ApiProperty({ example: "USER" })
  role: string;
}

class RegisterResponseDto {
  @ApiProperty({ example: 201 })
  status: number;

  @ApiProperty({ example: "Registered Successfully" })
  message: string;

  @ApiProperty({ type: RegisterResponseDataDto })
  data: RegisterResponseDataDto;
}

class ErrorResponseDto {
  @ApiProperty({ example: 401 })
  status: number;

  @ApiProperty({ example: "invalid credentials" })
  message: string;

  @ApiProperty({ example: null, nullable: true })
  data: any;
}

class ValidationErrorResponseDto {
  @ApiProperty({ example: 400 })
  status: number;

  @ApiProperty({ example: ["Invalid email format"], type: [String] })
  message: string[];

  @ApiProperty({ example: null, nullable: true })
  data: any;
}

class NotFoundErrorResponseDto {
  @ApiProperty({ example: 404 })
  status: number;

  @ApiProperty({ example: "User not found" })
  message: string;

  @ApiProperty({ example: null, nullable: true })
  data: any;
}

export {
  ErrorResponseDto,
  LoginResponseDataDto,
  LoginResponseDto,
  RegisterResponseDataDto,
  RegisterResponseDto,
  ValidationErrorResponseDto,
  NotFoundErrorResponseDto,
};
