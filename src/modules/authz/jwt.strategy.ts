import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { PersonService } from '../person/application/person.service';

const publicKey = readFileSync('cert/public.pem', 'utf8');
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
      algorithms: 'RS256',
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
