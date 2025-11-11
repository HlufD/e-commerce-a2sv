import { Injectable } from "@nestjs/common";
import { Order } from "src/orders/domain/entities/order.entity";
import { IOrderRepository } from "src/orders/domain/interfaces/order.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { PaginatedResponse, Paginator } from "src/shared/utils/paginator";

@Injectable()
export class OrderPrismaRepositoryImpl implements IOrderRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(order: Order, userId: string): Promise<Order> {
    try {
      const productIds = order.products.map((p) => p.id);
      const productsInDb = await this.prismaService.product.findMany({
        where: { id: { in: productIds } },
      });

      let totalPrice = 0;

      for (const orderItem of order.products) {
        const product = productsInDb.find((p) => p.id === orderItem.id);
        if (!product) {
          throw new Error(`Product with id ${orderItem.id} not found`);
        }

        if (orderItem.stock > product.stock) {
          throw new Error(
            `Product "${product.name}" is out of stock or insufficient quantity`
          );
        }

        totalPrice += product.price * (orderItem as any).quantity;
      }

      await Promise.all(
        order.products.map((orderItem) =>
          this.prismaService.product.update({
            where: { id: orderItem.id },
            data: { stock: { decrement: (orderItem as any).quantity } },
          })
        )
      );

      return await this.prismaService.order.create({
        data: {
          userId,
          description: "This is a new order",
          totalPrice,
          status: "PENDING",
          products: {
            connect: order.products.map((product) => ({ id: product.id })),
          },
        },
        include: {
          products: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll(
    page: number,
    limit: number,
    userId: string
  ): Promise<PaginatedResponse<Order>> {
    try {
      return await Paginator.paginate<Order>(
        (skip, take) =>
          this.prismaService.order.findMany({
            where: { userId },
            skip,
            take,
            orderBy: { createdAt: "desc" },
            include: {
              products: true,
            },
          }),
        () => this.prismaService.order.count(),
        page,
        limit
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
