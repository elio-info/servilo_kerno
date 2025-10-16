import { Module } from '@nestjs/common';
import { RolesGuard } from './guards/roles.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [ConfigModule, PassportModule, PersonModule],
  providers: [RolesGuard, JwtAuthGuard, JwtStrategy],
  exports: [RolesGuard],
})
export class AuthZModule {}
