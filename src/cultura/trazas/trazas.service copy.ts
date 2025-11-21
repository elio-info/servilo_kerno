import { Injectable } from '@nestjs/common';
import { CreateTrazaDto } from './dto/create-traza.dto';
import { UpdateTrazaDto } from './dto/update-traza.dto';
import { PersonService } from 'src/modules/person/application/person.service';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { InjectModel } from '@nestjs/mongoose';
import { Traza, TrazaClass } from './trazas.schema';
import { Model } from 'mongoose';

@Injectable()
export class TrazasService {

  private readonly actions_2_trace=[
    {act:'create',mth:'POST'}
    ,{act:'update',mth:'PATCH'}
    ,{act:'remove',mth:'DELETE'}
  ];
  private _traza_user: string;  //desde donde se llamo
  public set traza_Usr(value: string) {
    this._traza_user = value;
  }
  /**
   * traza_Usr
   */
  public get_Usr() { return this._traza_user;
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
    @InjectModel(TrazaClass.name) private trazaModel:Model<Traza>   , 
   // private jwtService: JwtService
  ) {}
  
  async logOperation(data: {
    collection: string;
    operation: 'create' | 'update' | 'delete';
    filter: any;
    before?: any;
    update?: any;
    userId?: string;
  }) {
    try {
      const log = new this.trazaModel(data);
      await log.save();
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
 traza_logg(act) {
    //return
    this._traza_accion=this.actions_2_trace[act].act;
    this._traza_metodo=this.actions_2_trace[act].mth;
    console.log(
     `${new Date().toISOString()} - [${this._traza_modulo} : ${this._traza_metodo}] {Persona:${this._traza_user}} ${this._traza_accion} / ${this._traza_estadoConsulta} / ${this._traza_consulta}`
     );
  }
  
  traza_log(trz:CreateTrazaDto):string {
    return trz.toString();
    //return `${new Date().toISOString()} - [${trz.modulo}] {Persona:${trz.user}} ${trz.accion} / ${trz.estadoConsulta} `
     
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

export class TrazaBaseSrvc{
  constructor(
    @InjectModel(TrazaClass.name) private logModel: Model<Traza>,
  ) {}

  async logOperation(data: {
    collection: string;
    operation: 'create' | 'update' | 'delete';
    filter: any;
    before?: any;
    update?: any;
    user?: string;
  }) {
    try {
      const log = new this.logModel(data);
      await log.save();
    } catch (error) {
      console.error('Failed to save log:', error);
    }
  }
}

export class TrazasSrvc <T extends Document> {
  constructor(
    protected readonly model: Model<T>,
    protected readonly logService: TrazaBaseSrvc,
  ) {}

  async create(createDto: any,result:Object, userId?: string)//: Promise<T> 
  {
    // const document = new this.model(createDto);
    // const savedDoc = await document.save();
    
    await this.logService.logOperation({
      collection: this.model.modelName,
      operation: 'create',
      filter: createDto, //savedDoc._id,
      update: result,//savedDoc.toObject(),
      user:userId,
    });

    return result//savedDoc;
  }

  async update(id: string, updateDto: any, userId?: string): Promise<T> {
    const previousDoc = await this.model.findById(id).exec();
    
    const updatedDoc = await this.model.findByIdAndUpdate(
      id, 
      updateDto, 
      { new: true }
    ).exec();

    if (updatedDoc) {
      await this.logService.logOperation({
        collection: this.model.modelName,
        operation: 'update',
        filter: {'_id':id,'dto':updateDto},
        before: previousDoc?.toObject(),
        update: updatedDoc.toObject(),
        user:userId,
      });
    }

    return updatedDoc;
  }

  async delete(id: string, userId?: string): Promise<T> {
    const document = await this.model.findById(id).exec();
    
    if (document) {
      const deletedDoc = await this.model.findByIdAndUpdate(id,{isDeleted:true},{new:true}).exec();
      
      await this.logService.logOperation({
        collection: this.model.modelName,
        operation: 'delete',
        filter: id,
        before: document.toObject(),
        user:userId,
      });

      return deletedDoc;
    }
    return null;
  }
}
