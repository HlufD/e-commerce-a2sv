import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  IProductRepositoryToken,
  type IProductRepository,
} from "./domain/interfaces/product.repository";

import { Product } from "./domain/entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(
    @Inject(IProductRepositoryToken)
    private readonly productRepository: IProductRepository
  ) {}

  async createProduct(payload: Product, userId: string) {
    try {
      const product = await this.productRepository.create(payload, userId);
      return {
        status: 201,
        message: "Product created successfully",
        data: product,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateProduct(payload: Partial<Product>, id: string) {
    try {
      let product = await this.productRepository.findById(id);

      if (!product) throw new Error("Product not found");

      product = await this.productRepository.update(id, payload);

      return {
        status: 200,
        message: "Product updated successfully",
        data: product,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteProduct(id: string) {
    try {
      const product = await this.productRepository.findById(id);

      if (!product) throw new NotFoundException("Product not found");

      await this.productRepository.delete(id);

      return {
        status: 200,
        message: "Product deleted successfully",
        data: null,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getProduct(id: string) {
    try {
      const product = await this.productRepository.findById(id);

      if (!product) throw new NotFoundException("Product not found");
      return {
        status: 200,
        message: "Product found successfully",
        data: product,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getProducts(query: { page: number; limit: number; search?: string }) {
    try {
      const { page, limit, search } = query;

      const { data, ...rest } = await this.productRepository.findAll(
        page,
        limit,
        search
      );

      return {
        status: 200,
        message: "Products found successfully",
        data,
        ...rest,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
