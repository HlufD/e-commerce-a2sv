import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from "class-validator";

class SignupDto {
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsString()
  @IsOptional()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: "Username must be alphanumeric (letters and numbers only)",
  })
  username?: string;

  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        "Password must include uppercase, lowercase, number, and special character",
    },
  )
  password: string;
}

class LoginDto {
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  password: string;
}

export { SignupDto, LoginDto };
