import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from "class-validator";

class SignupDto {
  @ApiProperty({
    example: "hanna@gmail.com",
    description: "User email address",
  })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @ApiPropertyOptional({
    example: "Hanna123",
    description: "Optional username (alphanumeric only)",
  })
  @IsString()
  @IsOptional()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: "Username must be alphanumeric (letters and numbers only)",
  })
  username?: string;

  @ApiProperty({
    example: "StrongPass1@",
    description:
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
  })
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        "Password must include uppercase, lowercase, number, and special character",
    }
  )
  password: string;
}

class LoginDto {
  @ApiProperty({
    example: "hanna@gmail.com",
    description: "User email address",
  })
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @ApiProperty({ example: "StrongPassword123", description: "User password" })
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  password: string;
}

export { SignupDto, LoginDto };
