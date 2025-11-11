import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { IUserRepositoryToken } from "./domain/interfaces/user.repository.interface";
import { AuthPrismaRepository } from "./storage/prisma/auth.repository.impl";
import { IHashingServiceToken } from "src/shared/interfaces/IHashingService";
import { HashingServiceImpl } from "src/shared/utils/hashing.service";
import { SharedModule } from "src/shared/shared.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { IJwtServiceToken } from "src/shared/interfaces/IJwtService";
import { JwtServiceImpl } from "src/shared/utils/jwt.service";

@Module({
  imports: [SharedModule, PrismaModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: IUserRepositoryToken,
      useClass: AuthPrismaRepository,
    },
    {
      provide: IHashingServiceToken,
      useClass: HashingServiceImpl,
    },
    {
      provide: IJwtServiceToken,
      useClass: JwtServiceImpl,
    },
  ],
})
export class AuthModule {}
