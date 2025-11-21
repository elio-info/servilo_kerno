import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PersonModule } from '../person/person.module';
import { ErrorModule } from '../common/errors/error.module';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { TrazasModule } from 'src/cultura/trazas/trazas.module';

// Cargar certificados - REQUERIDOS
// Usar process.cwd() para que funcione tanto en Docker como en desarrollo local
const privateKeyPath = join(process.cwd(), 'cert', 'key.pem');
const publicKeyPath = join(process.cwd(), 'cert', 'public.pem');

// Validar que ambos certificados existan
if (!existsSync(privateKeyPath)) {
  throw new Error(
    `❌ Certificado privado no encontrado en: ${privateKeyPath}\n` +
    `Por favor, coloca tu archivo key.pem en la carpeta cert/`
  );
}

if (!existsSync(publicKeyPath)) {
  throw new Error(
    `❌ Certificado público no encontrado en: ${publicKeyPath}\n` +
    `Por favor, coloca tu archivo public.pem en la carpeta cert/`
  );
}

// Leer certificados
let privateKey: string;
let publicKey: string;

try {
  privateKey = readFileSync(privateKeyPath, 'utf8');
  if (!privateKey || privateKey.trim().length === 0) {
    throw new Error(`El archivo ${privateKeyPath} está vacío`);
  }
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  throw new Error(
    `❌ Error al leer el certificado privado desde ${privateKeyPath}: ${errorMessage}\n` +
    `Asegúrate de que el archivo existe y tiene permisos de lectura.`
  );
}

try {
  publicKey = readFileSync(publicKeyPath, 'utf8');
  if (!publicKey || publicKey.trim().length === 0) {
    throw new Error(`El archivo ${publicKeyPath} está vacío`);
  }
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  throw new Error(
    `❌ Error al leer el certificado público desde ${publicKeyPath}: ${errorMessage}\n` +
    `Asegúrate de que el archivo existe y tiene permisos de lectura.`
  );
}

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
        signOptions: { expiresIn: '4h', algorithm: 'RS256' },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    //mio
    TrazasModule,
   
  ],
  providers: [
    AuthService,
    // mio
    TrazasService
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
