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

      return await this.prismaService.$transaction(async (prisma) => {
        const productsInDb = await prisma.product.findMany({
          where: { id: { in: productIds } },
        });

        let totalPrice = 0;

        for (const orderItem of order.products) {
          const product = productsInDb.find((p) => p.id === orderItem.id);
          if (!product) {
            throw new Error(`Product with id ${orderItem.id} not found`);
          }

          const quantity = (orderItem as any).quantity;
          if (quantity > product.stock) {
            throw new Error(
              `Insufficient stock for product "${product.name}". Requested: ${quantity}, Available: ${product.stock}`
            );
          }

          totalPrice += product.price * quantity;
        }

        for (const orderItem of order.products) {
          const quantity = (orderItem as any).quantity;
          await prisma.product.update({
            where: { id: orderItem.id },
            data: { stock: { decrement: quantity } },
          });
        }

        return await prisma.order.create({
          data: {
            userId,
            description: "This is a new order",
            totalPrice,
            status: "PENDING",
            products: {
              connect: order.products.map((p) => ({ id: p.id })),
            },
          },
          include: {
            products: true,
          },
        });
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
