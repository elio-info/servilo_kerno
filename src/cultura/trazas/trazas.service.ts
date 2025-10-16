import { Injectable } from '@nestjs/common';
import { CreateTrazaDto } from './dto/create-traza.dto';
import { UpdateTrazaDto } from './dto/update-traza.dto';
import { PersonService } from 'src/modules/person/application/person.service';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class TrazasService {

  
  constructor(    
    private jwtService: JwtService,
  ) {}
  
 
  traza_log(trz:CreateTrazaDto):string {
    //return
    return `${new Date().toISOString()} - [${trz.modulo}] {Persona:${trz.user}} ${trz.accion} / ${trz.estadoConsulta} `
     
  }

  create(createTrazaDto: CreateTrazaDto) {
    //return
    console.log( this.traza_log(createTrazaDto));    
  }

  findAll() {
    return `This action returns all trazas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} traza`;
  }

  update(id: number, updateTrazaDto: UpdateTrazaDto) {
    return `This action updates a #${id} traza`;
  }

  remove(id: number) {
    return `This action removes a #${id} traza`;
  }
}
