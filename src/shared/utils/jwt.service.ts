import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { IJwtService } from '../interfaces/IJwtService';

@Injectable()
export class JwtServiceImpl implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: string, options?: JwtSignOptions): string {
    return this.jwtService.sign(payload, options);
  }

  verify<T extends object = any>(token: string): T {
    return this.jwtService.verify<T>(token);
  }
}
