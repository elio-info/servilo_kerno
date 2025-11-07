import {
  BadRequestException,
  CanActivate,
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
export class AuthService  {

  // private myTraza:Traza

  constructor(
    private personService: PersonService,
    private jwtService: JwtService,
    private traz:TrazasService
  ) {
    // this.myTraza=new Traza()
    this.traz.traza_Modulo='AuthModule'      
  }

  //TODO Clan this function
  async signIn(username: string, pass: string) {

    console.log(`u:${username}`);
    

    this.traz.traza_Usr=username
    this.traz.traza_Modulo='SignIn'
    this.traz.traza_Metodo='POST'
    this.traz.traza_Accion='Autenticarse'

    //TODO-------Delete This After proper testing------
    
    if (username === 'test' && pass === 'test') {
      const fakeUser: PersonAuth = {
        sub: 'fakeID',
        username,
        hashPassword: 'fakePASs',
        // municipality: 'string',
        // entity: 'sdfsdfgsdfg',
        rol: 'fake'
      };
      this.traz.traza_EstadoConsulta='Ok'
      this.traz.traza_Usr +='fake'
      this.traz.traza_logg();    
    
      return this.makeToken(fakeUser);
    }
    //--------------------------------------------------
    console.log('no fake');
    
    const user: PersonAuth = await this.personService.byUserName(username);

    const isMatch = await compare(pass, user.hashPassword);

    if (!isMatch) {
      let nopasa=new UnauthorizedException();
      this.traz.traza_EstadoConsulta=nopasa.getStatus()+nopasa.getResponse().toString()
      this.traz.traza_logg();    
      throw nopasa
    }

    this.traz.traza_EstadoConsulta='Ok'
    this.traz.traza_Usr += user.rol
     this.traz.traza_logg();
    return this.makeToken(user);
  }
  
  async getTokenHeadersInfo(token: string)  {//:Promise<Person>
    let tk=token.split(' ')[1];
    
    const payload = this.jwtService.decode(token.split(' ')[1]) as PersonAuth;
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

  async getUserInfo(token: string)  {//:Promise<Person>
    type PayloadType = {
      sub: string;
      username: string;
    };
    const payload = this.jwtService.decode(token.split(' ')[1]) as PersonAuth;
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
      this.personService.update(userRec.sub, {
        hashPassword: await hash(newPassword),
      });
    } else {
      throw new BadRequestException('Password did not Match!!!');
    }
  }

  private async makeToken(user: PersonAuth) {
//  id,username,role,entitidad{id,nivel,nombre},tiempoExpiraToken
    // const entidad_ertenece={id:user.entity_id}
    const payload = { 
        sub: user.sub
        , username: user.username      

      // exp = expire session In: unix time
      //tiempoExpiraToken:Date.now()+36000 
     };
    const token  =await this.jwtService.signAsync(user);
    return {
      access_token: token,
    };
  }
}
