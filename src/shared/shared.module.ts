import { Module } from '@nestjs/common';
import { HashingServiceImpl } from './utils/hashing.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [HashingServiceImpl, JwtService],
  exports: [HashingServiceImpl, JwtService],
})
export class SharedModule {}
