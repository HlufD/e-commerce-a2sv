import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/auth/enums/role.enum";
import {
  CreateProductDto,
  GetProductsDto,
  UpdateProductDto,
} from "./dto/product.dto";
import { Product } from "generated/prisma";
import { User } from "src/auth/decorators/logged-user.decorator";
import { User as loggedUser } from "src/auth/domain/entities/user.entity";
import { AuthGuard } from "src/auth/guard/auth.guard";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post("/")
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  async createProduct(
    @Body() body: CreateProductDto,
    @User() user: loggedUser
  ) {
    return this.productsService.createProduct(body as Product, user.id);
  }

  @Put("/:id")
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  async updateProduct(@Body() body: UpdateProductDto, @Param("id") id: string) {
    console.log(id);
    return this.productsService.updateProduct(body, id);
  }

  @Delete("/:id")
  async deleteProduct(@Param("id") id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Get("/:id")
  async getProduct(@Param("id") id: string) {
    return this.productsService.getProduct(id);
  }

  @Get("/")
  async getProducts(@Query() query: GetProductsDto) {
    return this.productsService.getProducts(query as any);
  }
}
