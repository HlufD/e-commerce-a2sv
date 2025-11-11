import { Injectable } from "@nestjs/common";
import { User } from "src/auth/domain/entities/user.entity";
import { IUserRepository } from "src/auth/domain/interfaces/user.repository";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthPrismaRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.prismaService.user.findUnique({ where: { email } });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async create(
    email: string,
    password: string,
    username?: string,
  ): Promise<User> {
    try {
      const user = await this.prismaService.user.create({
        data: {
          email,
          password,
          username,
        },
      });

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findByUsername(username: string): Promise<User | null> {
    try {
      return await this.prismaService.user.findUnique({ where: { username } });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
