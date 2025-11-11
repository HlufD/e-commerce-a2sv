import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";
import { IJwtService } from "../interfaces/IJwtService";

@Injectable()
export class JwtServiceImpl implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  sign<T extends object = any>(payload: T, options?: JwtSignOptions): string {
    return this.jwtService.sign(payload, options);
  }

  verify<T extends object = any>(token: string, options: JwtVerifyOptions): T {
    return this.jwtService.verify<T>(token, options);
  }
}
