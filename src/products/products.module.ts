import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { IProductRepositoryToken } from "./domain/interfaces/product.repository";
import { ProductPrismaRepository } from "./storage/prisma/product.repository.impl";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: IProductRepositoryToken,
      useClass: ProductPrismaRepository,
    },
  ],
})
export class ProductsModule {}
