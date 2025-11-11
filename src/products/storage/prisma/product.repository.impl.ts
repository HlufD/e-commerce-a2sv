import { Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { Product } from "src/products/domain/entities/product.entity";
import { IProductRepository } from "src/products/domain/interfaces/product.repository";
import { UpdateProductDto } from "src/products/dto/product.dto";
import { PaginatedResponse, Paginator } from "src/shared/utils/paginator";

@Injectable()
export class ProductPrismaRepository implements IProductRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(product: Product, userId: string): Promise<Product> {
    try {
      const { name, description, price, stock, category } = product;

      return await this.prismaService.product.create({
        data: {
          name,
          description,
          price,
          stock: Number(stock) || 0,
          category,
          user: {
            connect: { id: userId },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findById(id: string): Promise<Product | null> {
    try {
      return await this.prismaService.product.findUnique({ where: { id } });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll(
    page = 1,
    limit = 10,
    search?: string
  ): Promise<PaginatedResponse<Product>> {
    try {
      const where: Prisma.ProductWhereInput =
        search && search.trim() !== ""
          ? {
              name: {
                contains: search,
                mode: "insensitive" as Prisma.QueryMode,
              },
            }
          : {};

      return await Paginator.paginate<Product>(
        (skip, take) =>
          this.prismaService.product.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: "desc" },
          }),
        () => this.prismaService.product.count({ where }),
        page,
        limit
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: string, product: UpdateProductDto): Promise<Product> {
    try {
      return await this.prismaService.product.update({
        where: { id },
        data: product,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.prismaService.product.delete({ where: { id } });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
