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
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { Traza } from 'src/cultura/trazas/entities/traza.entity';

@Injectable()
export class AuthService {

  private myTraza:Traza

  constructor(
    private personService: PersonService,
    private jwtService: JwtService,
    private traz:TrazasService
  ) {
    this.myTraza=new Traza()
    this.myTraza.modulo='AuthModule'      
  }

  //TODO Clan this function
  async signIn(username: string, pass: string) {

    this.myTraza.user=username
    this.myTraza.metodo='SignIn'
    this.myTraza.accion='Autenticarse'

    //TODO-------Delete This After proper testing------
    
    if (username === 'test' && pass === 'test') {
      const fakeUser: PersonAuth = {
        id: 'fakeID',
        username,
        hashPassword: 'fakePASs',
      };
      this.myTraza.estadoConsulta='Ok'
      this.traz.create(this.myTraza);    
    
      return this.makeToken(fakeUser);
    }
    //--------------------------------------------------
    const user: PersonAuth = await this.personService.byUserName(username);

    const isMatch = await compare(pass, user.hashPassword);

    if (!isMatch) {
      let nopasa=new UnauthorizedException();
      this.myTraza.estadoConsulta=nopasa.getStatus()+nopasa.getResponse().toString()
      this.traz.create(this.myTraza );    
      throw nopasa
    }

    this.myTraza.estadoConsulta='Ok'
     this.traz.create(this.myTraza );
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
     // tiempoExpiraToken:Date.now()+ 3600
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
      //tiempoExpiraToken:Date.now()+36000 
     };
    const token  =await this.jwtService.signAsync(payload);
    return {
      access_token: token,
    };
  }
}
