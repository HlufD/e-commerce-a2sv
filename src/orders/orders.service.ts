import { Inject, Injectable } from "@nestjs/common";
import {
  type IOrderRepository,
  IOrderRepositoryToken,
} from "./domain/interfaces/order.repository";
import { Order } from "./domain/entities/order.entity";

@Injectable()
export class OrdersService {
  constructor(
    @Inject(IOrderRepositoryToken)
    private readonly orderRepository: IOrderRepository
  ) {}

  async createOrder(payload: Partial<Order>, userId: string) {
    try {
      const order = await this.orderRepository.create(payload, userId);
      return {
        status: 201,
        message: "Order created successfully",
        data: order,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getOrders(
    query: { page: number; limit: number; search?: string },
    userId: string
  ) {
    try {
      const { page, limit, search } = query;

      const { data, ...rest } = await this.orderRepository.findAll(
        page,
        limit,
        userId,
        search
      );

      return {
        status: 200,
        message: "Orders found successfully",
        data,
        ...rest,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
