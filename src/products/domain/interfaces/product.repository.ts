import { PaginatedResponse } from "src/shared/utils/paginator";
import { Product } from "../entities/product.entity";

export interface IProductRepository {
  create(product: Product, userId: string): Promise<Product>;

  findById(id: string): Promise<Product | null>;

  findAll(
    page,
    limit: number,
    search?: string
  ): Promise<PaginatedResponse<Product>>;

  update(id: string, product: Partial<Product>): Promise<Product>;

  delete(id: string): Promise<void>;
}

export const IProductRepositoryToken = Symbol("IProductRepository");
