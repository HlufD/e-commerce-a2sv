import { PaginatedResponse } from "src/shared/utils/paginator";
import { Order } from "../entities/order.entity";

export interface IOrderRepository {
  create(order: Partial<Order>, userId: string): Promise<Order>;

  findAll(
    page: number,
    limit: number,
    userId: string,
    search?: string,
  ): Promise<PaginatedResponse<Order>>;
}

export const IOrderRepositoryToken = Symbol("IOrderRepository");
