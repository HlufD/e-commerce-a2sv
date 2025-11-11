import { User } from "../entities/user.entity";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(email: string, password: string, username?: string): Promise<User>;

  findByUsername(username: string): Promise<User | null>;
}

export const IUserRepositoryToken = Symbol("IUserRepository");
