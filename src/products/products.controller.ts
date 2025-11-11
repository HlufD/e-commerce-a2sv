import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
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
import { UploadFile } from "./decorators/file-upload.decorator";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post("/")
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @UploadFile({ fieldName: "image", folder: "products", maxSizeMB: 2 })
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateProductDto,
    @User() user: loggedUser
  ) {
    const product: Product = {
      ...body,
      imageUrl: file
        ? `${process.env.BASE_SERVER_URL}/uploads/products/${file.filename}`
        : null,
    } as Product;

    return this.productsService.createProduct(product, user.id);
  }

  @Put("/:id")
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @UploadFile({ fieldName: "image", folder: "products", maxSizeMB: 2 })
  async updateProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateProductDto,
    @Param("id") id: string
  ) {
    const product: Product = {
      ...body,
      imageUrl: file
        ? `${process.env.BASE_SERVER_URL}/uploads/products/${file.filename}`
        : null,
    } as Product;
    return this.productsService.updateProduct(product, id);
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
