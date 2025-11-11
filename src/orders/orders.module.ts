import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { SharedModule } from "src/shared/shared.module";
import { IOrderRepositoryToken } from "./domain/interfaces/order.repository";
import { OrderPrismaRepositoryImpl } from "./storage/prisma/order.repository.impl";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [SharedModule, PrismaModule, AuthModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: IOrderRepositoryToken,
      useClass: OrderPrismaRepositoryImpl,
    },
  ],
})
export class OrdersModule {}
