import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, SignupDto } from "./dto/auth-request.dto";
import {
  ApiAuthTag,
  ApiLogin,
  ApiSignup,
} from "./decorators/swagger.decorators";

@ApiAuthTag()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiSignup()
  @Post("/register")
  async signup(@Body() body: SignupDto) {
    return this.authService.singUp(body);
  }

  @ApiLogin()
  @Post("/login")
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
