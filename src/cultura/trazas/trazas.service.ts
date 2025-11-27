import { Injectable } from '@nestjs/common';
import { CreateTrazaDto } from './dto/create-traza.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Traza, TrazaClass } from './trazas.schema';
import { Model } from 'mongoose';

@Injectable()
export class TrazasService {
  
  private _trazaDTO: CreateTrazaDto;
  public get trazaDTO(): CreateTrazaDto {
    return this._trazaDTO;
  }
  public set trazaDTO(value: CreateTrazaDto) {
    this._trazaDTO = value;
  }

  constructor( 
    // @InjectModel(TrazaClass.name) private trazaModel:Model<Traza>   , 
   // private jwtService: JwtService
  ) {
    this.trazaDTO=new CreateTrazaDto()
    this.trazaDTO.before='';
    this.trazaDTO.update='';
  }
  
  async logOperation(data: {
    collection: string;
    operation: 'create' | 'update' | 'remove';
    filter: any;
    before?: any;
    update?: any;
    user?: string;
  }) {
    try {
      // const log = new this.trazaModel(data);
      // await log.save();
    } catch (error) {
      console.error('Failed to save log:', error);
    }
  }

 /**
  * The function `traza_logg` logs a message with timestamp, module, method, user, action, querystatus, and query details
  * @modulo que llama
  * @metodo que se uso
  * @usuario que hizo la propuesta
  * @action que se realizo
  * @consulta que se llamo
  * @estadoconsulta de la consulta que se obtuvo
  * 
  * @date + secuencia anterior
  */
 traza_log(trz:CreateTrazaDto):string {
    //return
    return `${new Date().toISOString()} - [${trz.collection}] {Persona:${trz.user}} ${trz.operation} / ${trz.error} /${trz.filter} / ${trz.before} =>${trz.update}`
     
  }

  save() {
    //return
    console.log( this.traza_log(this.trazaDTO));

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

  // update(id: number, updateTrazaDto: UpdateTrazaDto) {
  //   return `This action updates a #${id} traza`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} traza`;
  // }
}


