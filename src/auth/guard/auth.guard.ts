import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
  Inject,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { ROLES_KEY } from "../decorators/roles.decorator";
import {
  type IJwtService,
  IJwtServiceToken,
} from "src/shared/interfaces/IJwtService";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(IJwtServiceToken) private readonly jwtService: IJwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException("Authorization token is missing");
    }

    const payload = await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
      algorithms: ["HS256"],
    });

    (request as any).user = payload;

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const userRole = payload.role;
    const hasRole = requiredRoles.includes(userRole);

    if (!hasRole) {
      throw new ForbiddenException(
        `Access denied: requires ${requiredRoles.join(", ")} role.`,
      );
    }

    return true;
  }

  private extractToken(request: Request): string | undefined {
    const authHeader = request.headers["authorization"];
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(" ");
    return type === "Bearer" ? token : undefined;
  }
}
