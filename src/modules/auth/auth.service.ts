import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PersonService } from '../person/application/person.service';
import { compare } from '../common/helpers/password.hasher';
import { Person } from '../person/domain/entities/person.entity';
import { hashPassword as hash } from 'src/modules/common/helpers/password.hasher';
import { PersonAuth } from './domain/person-auth.entity';
import { PasswordDontMatchError } from '../common/errors/password-dont-match.error';

@Injectable()
export class AuthService {
  constructor(
    private personService: PersonService,
    private jwtService: JwtService,
  ) {}

  //TODO Clan this function
  async signIn(username: string, pass: string) {
    //TODO-------Delete This After proper testing------
    if (username === 'test' && pass === 'test') {
      const fakeUser: PersonAuth = {
        id: 'fakeID',
        username,
        hashPassword: 'fakePASs',
      };
      return this.makeToken(fakeUser);
    }
    //--------------------------------------------------
    const user: PersonAuth = await this.personService.byUserName(username);

    const isMatch = await compare(pass, user.hashPassword);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    return this.makeToken(user);
  }

  async getUserInfo(token: string)  {//:Promise<Person>
    type PayloadType = {
      sub: string;
      username: string;
    };

    const payload = this.jwtService.decode(token.split(' ')[1]) as PayloadType;
    let data_ret=  await this.personService.findOne(payload.sub);
    let prsn= {
      id_usr: data_ret.id,
      name_usr:data_ret.name,
      role_usr: data_ret.role,
      img_usr:data_ret.image,
      pertenece:{
          id_ent:data_ret.entity.id,
          nivel_ent:data_ret.entity.entityType.hierarchy,
          name_ent:data_ret.entity.name
        },
      tiempoExpiraToken:Date.now()+ 3600
    // const entidad_ertenece={id:user.entity_id}

    }
    return prsn
  }

  async changePassword(user, oldPassword, newPassword): Promise<void> {
    const userRec: PersonAuth = await this.personService.byUserName(
      user.username,
    );
    if (await compare(oldPassword, userRec.hashPassword)) {
      this.personService.update(userRec.id, {
        hashPassword: await hash(newPassword),
      });
    } else {
      throw new BadRequestException('Password did not Match!!!');
    }
  }

  private async makeToken(user: PersonAuth) {
//  id,username,role,entitidad{id,nivel,nombre},tiempoExpiraToken
    // const entidad_ertenece={id:user.entity_id}
    const payload = { sub: user.id, username: user.username, 
      // exp = expire session In: unix time
      tiempoExpiraToken:Date.now()+3600  };
    const token  =await this.jwtService.signAsync(payload);
    console.log(token);
    return {
      access_token: token,
    };
  }
}
