import { JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";

export interface IJwtService {
  sign(payload: any, options?: JwtSignOptions);

  verify<T extends object = any>(token: string, options: JwtVerifyOptions): T;
}

export const IJwtServiceToken = Symbol("IJwtService");
