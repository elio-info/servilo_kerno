import { Injectable } from '@nestjs/common';
import { CreateTrazaDto } from './dto/create-traza.dto';
import { UpdateTrazaDto } from './dto/update-traza.dto';
import { PersonService } from 'src/modules/person/application/person.service';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class TrazasService {

  private _traza_user: string;  //desde donde se llamo
  public set traza_Usr(value: string) {
    this._traza_user = value;
  }
  private _traza_accion : string; //que se quizo hacer
  public set traza_Accion(value: string) {
    this._traza_accion = value;
  }
  private _traza_consulta : string; //consulta que se quizo hacer
  public set traza_Consulta(value: string) {
    this._traza_consulta = value;
  }

  private _traza_metodo : string; //consulta que se quizo hacer
  public set traza_Metodo(value: string) {
    this._traza_metodo = value;
  }

  private _traza_modulo : string ;
  public set traza_Modulo(value: string) {
    this._traza_modulo = value;
  }
  
  private _traza_estadoConsulta : string;
  public set traza_EstadoConsulta(value: string) {
    this._traza_estadoConsulta = value;
  }

  constructor(      
    private jwtService: JwtService,
  ) {}
  
 traza_logg() {
    //return
    console.log(
     `${new Date().toISOString()} - [${this._traza_modulo} : ${this._traza_metodo}] {Persona:${this._traza_user}} ${this._traza_accion} / ${this._traza_estadoConsulta} / ${this._traza_consulta}`
     );
  }
  
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
