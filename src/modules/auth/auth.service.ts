import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PersonService } from '../person/application/person.service';
import { compare } from '../common/helpers/password.hasher';
import { hashPassword as hash } from 'src/modules/common/helpers/password.hasher';
import { PersonAuth } from './domain/person-auth.entity';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { Person } from '../person/domain/entities/person.entity';
import { UpdatePersonDto } from '../person/domain/dto/update-person.dto';
import { PersonRepository } from '../person/domain/repository/person.repository';
import { MongoosePersonRepository } from '../person/infrastructure/mongoose-person.repository';

@Injectable()
export class AuthService  {

  // private trazaDTO:CreateTrazaDto

  constructor(
    private personService: PersonService,
    @Inject(MongoosePersonRepository)
        private personRepository: PersonRepository,
    private jwtService: JwtService,
    private traz:TrazasService
  ) {
    // this.myTraza=new Traza(){'user':'fake','collection':'Person','operation':'SignIn','error':'ok'}
    // this.traz.trazaDTO = new CreateTrazaDto();
    this.traz.trazaDTO.collection='persons';   
    this.traz.trazaDTO.before={};     
  }

  //TODO Clan this function
  async signIn(username: string, pass: string) {

    console.log(`u:${username}`);
    this.traz.trazaDTO.user={username};
    this.traz.trazaDTO.error='ok';      
    this.traz.trazaDTO.operation='SignIn'
    let pss=await hash (pass)
    this.traz.trazaDTO.filter= {'username': username, 'pass': pss+'.'+Date.now() }   ;

    //TODO-------Delete This After proper testing------
    
    if (username === 'test' )//test user 
    {    if(pass === 'test') {
          const fakeUser: PersonAuth = {
            sub: 'fakeID',
            username:'fakeName',
            hashPassword: 'fakePASs',
            // municipality: 'string',
            // entity: 'sdfsdfgsdfg',
            rol: 'fakeRol'
          };
          this.traz.trazaDTO.user=fakeUser;
          this.traz.trazaDTO.update=fakeUser;
          this.traz.save()
          // this.traz.create(this.traz.trazaDTO);    
          return this.makeToken(fakeUser);
      }
      else {

          let nopasa=new UnauthorizedException();
          this.traz.trazaDTO.error=nopasa
          this.traz.save();
          // this.traz.create(this.traz.trazaDTO);
          return nopasa.toString();
      }
    }
   else  //--------------------------------------------------
   {
    console.log('no fake');
    let user: PersonAuth = null;
    try {
      user = await this.personService.byUserName(username);
     // console.log(user);    
    } catch (nopasa ) {
       this.traz.traza_error('The user can not be found')
          this.traz.save();
          // this.traz.create(this.traz.trazaDTO);
          return nopasa.toString();
    }
    
    const isMatch = await compare(pass, user.hashPassword);
    console.log(isMatch);
    if (!isMatch) {
      let nopasa=new UnauthorizedException();
      this.traz.traza_error(nopasa.name,nopasa.message,'Password no match')
      this.traz.save();
    //this.traz.create(this.traz.trazaDTO);
      return this.traz.terror();
    }
    this.traz.trazaDTO.user=user;// += ' ['+ user.rol+']';
    this.traz.save();
    //  this.traz.create(this.traz.trazaDTO);
    return this.makeToken(user);
   } 
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
          nivel_ent:data_ret.entity.entityType,//.hierarchy,
          name_ent:data_ret.entity.name
        },
      charge:data_ret.charge  
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
          nivel_ent:data_ret.entity.entityType,//.hierarchy
          name_ent:data_ret.entity.name
        },
      charge:data_ret.charge
     // tiempoExpiraToken:Date.now()+ 3600
    // const entidad_ertenece={id:user.entity_id}

    }
    return prsn
  }

// , oldPassword
  async changePassword(user, oldPassword,newPassword): Promise<Person|string> {
    console.log(`u:${user.username}`);
    this.traz.trazaDTO.user=user.username +' ['+ user.rol+']';
    this.traz.trazaDTO.error='ok';      
    this.traz.trazaDTO.operation='changePassword';
    
    const userRec: PersonAuth = await this.personService.byUserName(   user.username    );
    
    let oldpss= userRec.hashPassword,
        newTestpss=await hash(oldPassword) ,
        newpss= await hash(newPassword);

    this.traz.trazaDTO.filter={'username': user.username, 'oldPsswrd': oldpss, 'nwPsswrd':newpss }   ;

     if (! await compare(oldpss, newTestpss)) {//diferencia entre llaves vieja y residente
      this.traz.trazaDTO.error=new Error('No se reconocen las llaves.');
      this.traz.trazaDTO.before='';
      this.traz.trazaDTO.update='';
      this.traz.save();
      return this.traz.terror();
    }

     if (! await compare(oldpss, newpss)) {//igualdad entre llaves residente y nueva
      this.traz.trazaDTO.error=new Error('No se guradan las mismas llaves.');
      this.traz.trazaDTO.before='';
      this.traz.trazaDTO.update='';
      this.traz.save();
      return this.traz.terror();
    }

    let upd=new UpdatePersonDto();
      upd.id=userRec.sub;
      upd.hashPassword=newpss;
      let nw= await this.personRepository.update(upd, this.traz);
     return nw;
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
    // console.log(token);
    
    return {
      access_token: token,
    };
  }
}
