import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto, GetOrdersDto } from "./dto/order-request.dto";
import { User } from "src/auth/decorators/logged-user.decorator";
import { User as loggedUser } from "src/auth/domain/entities/user.entity";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/auth/enums/role.enum";
import { ApiCreateOrder, ApiGetOrders } from "./decorators/swagger.decorators";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post("/")
  @ApiCreateOrder()
  @UseGuards(AuthGuard)
  @Roles(Role.USER)
  async createOrder(@Body() body: CreateOrderDto, @User() user: loggedUser) {
    return await this.ordersService.createOrder(body as any, user.id);
  }

  @Get("/")
  @ApiGetOrders()
  @UseGuards(AuthGuard)
  @Roles("USER")
  async getOrders(@Query() query: GetOrdersDto, @User() user: loggedUser) {
    return await this.ordersService.getOrders(query, user.id);
  }
}
