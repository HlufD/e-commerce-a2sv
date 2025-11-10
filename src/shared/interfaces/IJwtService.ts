import { JwtSignOptions } from '@nestjs/jwt';

export interface IJwtService {
  sign(payload: any, options?: JwtSignOptions);

  verify<T extends object = any>(token: string): T;
}

export const IJwtServiceToken = Symbol('IJwtService');
