import { Inject, Injectable } from '@nestjs/common';
import { Create_Proyecto_Sociocultural_Comunitario_Dto } from './dto/create_proy_soccult_com.dto';
import { Update_Proyecto_Sociocultural_Comunitario_Dto } from './dto/update_proy_soccult_com.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Proyecto_Sociocultural_Comunitario_Document, Proyecto_Sociocultural_Comunitario_Model } from './schemas/proy_soccult_com.schema';
import { Model } from 'mongoose';
import { IsRelationshipProvider } from 'src/modules/common/helpers/customIdValidation';
import { TrazasService } from '../trazas/trazas.service';
import { Proyecto_Socioculturale_Comunitario_Entity } from './schemas/proy_soccult_com.entity';
import { DataList } from 'src/modules/common/data-list';
import { Search_Proyecto_Sociocultural_Comunitario_Dto } from './dto/search_proy_soccult_com.dto';
import { ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';

const MODULE='Proyecto_Sociocultural_Comunitario';
const IS_NOT_DELETED = { isDeleted: false };
@Injectable()
export class Proyecto_Sociocultural_Comunitario_Service {
  private cstvldt: IsRelationshipProvider ;
  constructor(
    @InjectModel(Proyecto_Sociocultural_Comunitario_Model.name) private readonly pscc_Model:Model<Proyecto_Sociocultural_Comunitario_Document>,
    @Inject(TrazasService) private traza:TrazasService
  ){ traza.trazaDTO.collection=MODULE}

  async create(createProySoccultComDto: Create_Proyecto_Sociocultural_Comunitario_Dto,tkhds:string):Promise<Proyecto_Socioculturale_Comunitario_Entity> {
    this.traza.trazaDTO.user=tkhds;
    this.traza.trazaDTO.operation='save';
    this.traza.trazaDTO.filter=createProySoccultComDto;

    let crt = await this.cstvldt.validateId_onTable('Consejo_Popular_Municipal',createProySoccultComDto.consejopopular_municipality);
    console.log('existe '+createProySoccultComDto.consejopopular_municipality+' ?'+crt);

    if (crt>0) { 
      try {
        let mnc=await new this.pscc_Model(createProySoccultComDto).save();
        this.traza.trazaDTO.update=JSON.stringify (createProySoccultComDto);
        this.traza.trazaDTO.before=''
        this.traza.trazaDTO.error='Ok';
        this.traza.save();        
        return this.toEntity(mnc );        
      } catch (error) {
      let err=new Error('Problema al crear el proy '+createProySoccultComDto)
        this.traza.trazaDTO.error=err.name+' => '+err.message;
        this.traza.save()
        throw err;  
      }           
    } else {
      let err=new Error('Problema con consejo popular dada '+createProySoccultComDto.consejopopular_municipality)
        this.traza.trazaDTO.error=err.name+' => '+err.message;
        this.traza.save()
        throw err;
      }
  }

  async findAll(page = 1, pageSize = 15):Promise<DataList<Proyecto_Socioculturale_Comunitario_Entity>> {
    const skipCount = (page - 1) * pageSize;

    const [cp, count] = await Promise.all([
      this.pscc_Model
        .find(IS_NOT_DELETED)
        .skip(skipCount)
        .limit(pageSize)
       .populate('consejopopular_municipality')
        .exec(),
      this.pscc_Model.countDocuments(IS_NOT_DELETED).exec(),
    ]);
    const cpCollection = cp.map((cpp) =>
      this.toEntity(cpp),
    );

    const dataList: DataList<Proyecto_Socioculturale_Comunitario_Entity> = {
      data: cpCollection,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
    return dataList;
    
  }

  async findOne(id: string) :Promise<Proyecto_Socioculturale_Comunitario_Entity>{
    const cpp = await this.pscc_Model
      .findById(id)
      .where(IS_NOT_DELETED)
      .populate('consejopopular_municipality');

    if (!cpp) {
      throw new ObjectNotFound(MODULE);
    }

    return this.toEntity(cpp);    
  }

  update(id: string, updateProySoccultComDto: Update_Proyecto_Sociocultural_Comunitario_Dto, tkhds:string):Promise<Proyecto_Sociocultural_Comunitario_Document> {
    console.log(updateProySoccultComDto);
    this.traza.trazaDTO.user=tkhds;
    return this.pscc_Model.findByIdAndUpdate(id,updateProySoccultComDto,{new :true })
  }

  async remove(id: string,tkhds:string):Promise<Proyecto_Socioculturale_Comunitario_Entity> {
    this.traza.trazaDTO.user=tkhds;
    let traza=this.traza;

    traza.trazaDTO.filter= JSON.stringify ({_id:id}) ;
    traza.trazaDTO.operation='remove';
    //actividades culturales
    let hijos=await this.cstvldt.validate_onTable('Consejo_Popular_Municipal',{'municipio':id},IS_NOT_DELETED);
    console.log('hijos',hijos);
    if (hijos!=0) { //tienes hijos no te borras  
      let error='Error: This object '+MODULE+' id@ '+id+' has actives childs' ;
      traza.trazaDTO.error= error ;
      traza.save();
      throw error;
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
    return this.toEntity(await this.pscc_Model.findByIdAndDelete(id))
  }
  async search(query:Search_Proyecto_Sociocultural_Comunitario_Dto):Promise<Proyecto_Socioculturale_Comunitario_Entity> {
    return this.toEntity(await this.pscc_Model.findByIdAndDelete(query.nombre))
  }

  private toEntity(pry: Proyecto_Sociocultural_Comunitario_Document): Proyecto_Socioculturale_Comunitario_Entity {
    return {
      id:pry._id.toString(),
      nombre:pry.nombre,
      consejopopular_municipality:pry.consejopopular_municipality,
      municipio:pry.municipio,
      direccion:pry.direccion,
    // province:string
      gestor:pry.gestor,
      telefonos:pry.telefonos,
      actividades:pry.actividades,
      aprobado:pry.aprobado,
      cancelado:pry.cancelado
    }
  }
}
