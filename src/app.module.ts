import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [AuthModule, PrismaModule, ProductsModule, OrdersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
