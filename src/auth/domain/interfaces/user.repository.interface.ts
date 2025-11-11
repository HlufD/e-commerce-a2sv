import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  create(
    email: string,
    password: string,
    username?: string
  ): Promise<UserEntity>;

  findByUsername(username: string): Promise<UserEntity | null>;
}

export const IUserRepositoryToken = Symbol("IUserRepository");
