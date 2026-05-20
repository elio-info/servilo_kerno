import { Inject, Injectable } from '@nestjs/common';
import { Create_Proyecto_Sociocultural_Comunitario_Dto } from './dto/create_proy_soccult_com.dto';
import { Update_Proyecto_Sociocultural_Comunitario_Dto } from './dto/update_proy_soccult_com.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Proyecto_Sociocultural_Comunitario_Document, Proyecto_Sociocultural_Comunitario_Model } from './schemas/proy_soccult_com.schema';
import { Model } from 'mongoose';
import { IsRelationshipProvider } from 'src/modules/common/helpers/customIdValidation';
import { TrazasService } from '../trazas/trazas.service';
import { Gestor_Entity, Proyecto_Socioculturale_Comunitario_Entity } from './schemas/proy_soccult_com.entity';
import { DataList } from 'src/modules/common/data-list';
import { Search_Proyecto_Sociocultural_Comunitario_Dto } from './dto/search_proy_soccult_com.dto';
import { ObjectCanNotDeleted, ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';
import { getUserHTTP_JWTS } from 'src/modules/common/extractors';
import { ObjectDoesNotExist } from 'src/modules/domain/errors/object-doesnt-exist.error';

@Injectable()
export class Proyecto_Sociocultural_Comunitario_Service {
  private cstvldt: IsRelationshipProvider ;
  private MODULE='Proyecto_Sociocultural_Comunitario';
  private IS_NOT_DELETED = { isDeleted: false };
constructor(
    @InjectModel(Proyecto_Sociocultural_Comunitario_Model.name) private readonly pscc_Model:Model<Proyecto_Sociocultural_Comunitario_Document>,
    @Inject(TrazasService) private traza:TrazasService
  ){ traza.trazaDTO.collection=this.MODULE}

  async create(createProySoccultComDto: Create_Proyecto_Sociocultural_Comunitario_Dto,tkhds:string):Promise<Proyecto_Socioculturale_Comunitario_Entity |string> {
    
    this.traza.trazaDTO.user=getUserHTTP_JWTS(tkhds);
    this.traza.trazaDTO.operation='save';
    this.traza.trazaDTO.filter=createProySoccultComDto;
    
    try {
      let mnc=await new this.pscc_Model(createProySoccultComDto).save();
      this.traza.trazaDTO.update=JSON.stringify (createProySoccultComDto);
      this.traza.trazaDTO.before=''
      this.traza.trazaDTO.error='Ok';
      this.traza.save();        
      return this.toEntity(mnc );        
    } catch (error) {      
      this.traza.trazaDTO.error=error;
      this.traza.save()
      return error.toString();  
    }           
   
  }

  async findAll(page = 1, pageSize = 15):Promise<DataList<Proyecto_Socioculturale_Comunitario_Entity>| string> {
    const skipCount = (page - 1) * pageSize;
    console.log(page,pageSize,skipCount);
 
    let cp= await  this.pscc_Model
        .find(this.IS_NOT_DELETED)
        // .skip(skipCount)
        .limit(pageSize)
       .populate('consejopopular_municipality')
        .exec();
    console.log(cp);
    
    const cpCollection = cp.map((cpp) =>
      this.toEntity(cpp),
    );

    const dataList: DataList<Proyecto_Socioculturale_Comunitario_Entity> = {
      data: cpCollection,
      totalPages: Math.ceil(cpCollection.length / pageSize),
      currentPage: page,
    };
    return dataList;
    
  }

  async findOne(id: string) :Promise<Proyecto_Socioculturale_Comunitario_Entity | string>{
    const cpp = await this.pscc_Model
      .findById(id)
      .where(this.IS_NOT_DELETED)
      .populate('consejopopular_municipality');

    if (!cpp) {
      return new ObjectNotFound(this.MODULE).toString();
    }

    return this.toEntity(cpp);    
  }

  async update( updateProySoccultComDto: Update_Proyecto_Sociocultural_Comunitario_Dto, tkhds:string):Promise<Proyecto_Socioculturale_Comunitario_Entity | string> {
    console.log(updateProySoccultComDto);
    this.traza.trazaDTO.user=getUserHTTP_JWTS(tkhds);
    this.traza.trazaDTO.operation='update';
    this.traza.trazaDTO.filter=updateProySoccultComDto;
    try {
      let antes=await this.findOne( updateProySoccultComDto.id);
       let rest= await this.pscc_Model.findOneAndUpdate( {_id:updateProySoccultComDto.id,...this.IS_NOT_DELETED},updateProySoccultComDto, { new: true});
       
       if (!rest) {
        let err=new Error('Problema con actualizacion de '+this.MODULE)
        this.traza.trazaDTO.error=err;
        this.traza.trazaDTO.update='';
        this.traza.save()
        return err.toString();
        }
        this.traza.trazaDTO.before=antes;
        this.traza.trazaDTO.update=rest;    
        this.traza.save()       
        return this.toEntity(rest)
    } catch (error) {
      let err=new Error('Problema con actualizacion Sistema '+this.MODULE)
        this.traza.trazaDTO.error=error;
        this.traza.trazaDTO.update='';
        this.traza.save()
        return error.toString();
    }  
   
  }

  async remove(id: string,tkhds:string):Promise<Proyecto_Socioculturale_Comunitario_Entity | string> {
    this.traza.trazaDTO.user=getUserHTTP_JWTS(tkhds);
    let traza=this.traza;

    traza.trazaDTO.filter= JSON.stringify ({_id:id}) ;
    traza.trazaDTO.operation='remove';
    //actividades culturales
    let hijos=await this.cstvldt.validate_onTable('control_actividadcultural',{'ps_planificado':id},this.IS_NOT_DELETED);
    console.log('hijos',hijos);
    if (hijos!=0) { //tienes hijos no te borras  
      let error=new ObjectCanNotDeleted (this.MODULE,hijos );
      traza.trazaDTO.error= error ;
      traza.save();
      throw traza.terror();
    }
    let bf=this.findOne(id);
    traza.trazaDTO.before=bf;      
    const document = await this.pscc_Model.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        isDeleted: true,
      },
    );

    if (!document) {
       let err=new Error('Problema con eliminacion de municipio '+  id)
        traza.trazaDTO.error=err.name+' => '+err.message;
        traza.trazaDTO.update='';
        traza.save()
        throw err;
    }
    traza.trazaDTO.update=document;    
    traza.trazaDTO.error='Ok';
    traza.save()
    return this.toEntity(document);
    // return this.toEntity(await this.pscc_Model.findByIdAndDelete(id))
  }
  async search(query:Search_Proyecto_Sociocultural_Comunitario_Dto):Promise<Proyecto_Socioculturale_Comunitario_Entity[] | string> {
    if (query.exactName)  
      query.name=  "{ $regex:"+query.name+" , $options:'i'}";
    let srch= await this.pscc_Model.find().where(query);
    let srchCll= srch.map((itm)=>this.toEntity(itm))
    return srchCll
  }

  private toEntity(pry: Proyecto_Sociocultural_Comunitario_Document): Proyecto_Socioculturale_Comunitario_Entity {
   
    return {
      id:pry._id.toString(),
      name:pry.name,
      consejopopular_municipality:pry.consejopopular_municipality,
      municipio:pry.municipio,
      direccion:pry.direccion,    
      gestor:pry.gestor,
      actividades:pry.actividades,
      aprobado:pry.aprobado,
      cancelado:pry.cancelado,
      isDeleted:pry.isDeleted
    }
  }
}
