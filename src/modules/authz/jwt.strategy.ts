import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { PersonService } from '../person/application/person.service';

// Cargar certificado público - REQUERIDO
// Usar process.cwd() para que funcione tanto en Docker como en desarrollo local
let publicKey: string;
const certPath = join(process.cwd(), 'cert', 'public.pem');

if (!existsSync(certPath)) {
  throw new Error(
    `❌ Certificado público no encontrado en: ${certPath}\n` +
    `Por favor, coloca tu archivo public.pem en la carpeta cert/`
  );
}

try {
  publicKey = readFileSync(certPath, 'utf8');
  if (!publicKey || publicKey.trim().length === 0) {
    throw new Error(`El archivo ${certPath} está vacío`);
  }
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  throw new Error(
    `❌ Error al leer el certificado público desde ${certPath}: ${errorMessage}\n` +
    `Asegúrate de que el archivo existe y tiene permisos de lectura.`
  );
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'my_jwt') {
  constructor(
    private readonly config: ConfigService,
    private readonly service: PersonService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: publicKey,
      algorithms: 'RS256', // Siempre RSA cuando usamos certificados
    });
  }

  async validate(payload: any) {
    try {
      return await this.service.findOne(payload.sub);
    } catch (e) {
      return payload;
    }
  }
}
