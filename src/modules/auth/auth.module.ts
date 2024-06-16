import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PersonModule } from '../person/person.module';
import { ErrorModule } from '../common/errors/error.module';
import { readFileSync } from 'fs';

const privateKey = readFileSync('cert/key.pem', 'utf8');
const publicKey = readFileSync('cert/public.pem', 'utf8');

@Module({
  imports: [
    ConfigModule,
    ErrorModule,
    PersonModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        publicKey: publicKey,
        privateKey: privateKey,
        signOptions: { expiresIn: '10h', algorithm: 'RS256' },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
