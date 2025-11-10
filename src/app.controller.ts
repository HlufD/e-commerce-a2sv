import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Health")
@Controller("health")
export class AppController {
  @Get("/")
  health() {
    return { message: "server is up running!" };
  }
}
