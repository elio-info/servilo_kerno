import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection, Model, Mongoose } from 'mongoose';

import { DataList } from 'src/modules/common/data-list';
import { ObjectCanNotDeleted, ObjectId_NotFound, ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';
import { MunicipalityRepository } from '../domain/repository/municipality.repository';
import { MunicipalityDocument, MunicipalityModel } from './municipality.schema';
import { Municipality } from '../domain/entities/municipality.entity';
import { CreateMunicipalityDto } from '../domain/dto/create-municipality.dto';
import { UpdateMunicipalityDto } from '../domain/dto/update-municipality.dto';
import { validateId } from 'src/modules/common/helpers/id-validator';
import { IsRelationshipProvider } from 'src/modules/common/helpers/customIdValidation';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { table } from 'console';
import { extractMunicipality } from 'src/modules/common/extractors';
import { DuplicatedValueError, SearchDuplicateValue } from 'src/modules/common/errors/duplicated-value.error';
import { isNull } from 'util';
import SearchMunicipalityDto from '../domain/dto/search-municipality.dto';

const MODULE = 'Municipality';
const IS_NOT_DELETED = { isDeleted: false };

@Injectable()
export class MongooseMunicipalityRepository implements MunicipalityRepository {
    private cstvldt: IsRelationshipProvider 
  
  constructor(
    @InjectModel(MunicipalityModel.name)
    private municipalityModel: Model<MunicipalityModel>,
    @InjectConnection() private cnn: Connection,
  ) { this.cstvldt= new IsRelationshipProvider(this.cnn)}

  async findAll( page: number, pageSize: number,): Promise<DataList<Municipality> |string> {
    const skipCount = (page - 1) * pageSize;

    const municipalities = await this.municipalityModel
        .find(IS_NOT_DELETED)
        .skip(skipCount)
        .limit(pageSize)
       .populate('province')
        .exec();
    // console.log(municipalities);
    
    const municipalityCollection = municipalities.map((municipality) =>
      this.toEntity(municipality),
    );

    const dataList: DataList<Municipality> = {
      data: municipalityCollection,
      totalPages: Math.ceil(municipalityCollection.length / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(municipality: CreateMunicipalityDto,traza:TrazasService): Promise<Municipality |string> {
    traza.trazaDTO.operation='save';
    traza.trazaDTO.filter=municipality;

    let dup=await SearchDuplicateValue(this.municipalityModel,'name',municipality.name)

    if (dup.length>0) {
      console.log('aparece fuera true -',dup);
      let err=new DuplicatedValueError( municipality.name + ' -> ' + MODULE);
      traza.trazaDTO.error=err;
      traza.trazaDTO.before='';
      traza.trazaDTO.update='';
      traza.save();
      return err.toString();
    }
    
      console.log('aparece fuera false -',dup);
      let crt = await this.cstvldt.validateId_onTable('provinces',municipality.province);
      console.log('existe '+municipality.province+' ?'+crt);
    
      if (crt<1){
        let err=new Error('Problema con provincia dada '+municipality.province)
          traza.trazaDTO.error=err.name+' => '+err.message;
          traza.save()
          return err.toString();
        }
       
        try {
          let mnc=await new this.municipalityModel(municipality).save();
          traza.trazaDTO.update=JSON.stringify (municipality);
          traza.trazaDTO.before=''
          traza.trazaDTO.error='Ok';
          traza.save();   
          let buscar=new SearchMunicipalityDto();
          buscar.name=municipality.name;
          let ids=mnc._id.toString();
          return await this.findOne(ids);                          
        } 
        catch (error) {
          console.log('error salva',error);          
        let err=new Error('Problema al crear el municipio '+municipality)
          traza.trazaDTO.error=err.name+' => '+err.message;
          traza.save()
          return err.toString();  
        }         
      
  }

  async findOne(id: string): Promise<Municipality |string> {
    validateId(id, MODULE);

    const municipality = await this.municipalityModel
      .findById(id)
      .where(IS_NOT_DELETED)
      .populate('province')
      .exec();

    if (!municipality) {
      return (new ObjectId_NotFound(MODULE,id)).toString();
    }

    return this.toEntity(municipality);
  }

  async update( municipality: UpdateMunicipalityDto,traza:TrazasService ): Promise<Municipality |string> {
    console.log( 'entrando update ',municipality);
    
    traza.trazaDTO.filter=municipality;
    traza.trazaDTO.operation='update';
    let crt = await this.cstvldt.validateId_onTable('province',municipality.province);//,IS_NOT_DELETED
    if (crt<=0) {
      let err=new ObjectId_NotFound('Provincia',municipality.province);
        traza.trazaDTO.error=err;
        traza.save()
        return err.toString();  
      }
    let bf=this.findOne(municipality.id);
    console.log('lo veo antes ',bf);
    console.log('su dto ',municipality);
    traza.trazaDTO.before=bf;  
    const updated = await this.municipalityModel.findByIdAndUpdate(
      { _id: municipality.id, ...IS_NOT_DELETED },
      municipality,
      { new: true, populate: 'province' },
    );
  console.log('lo veo despues ',updated);
      
    if (!updated) {
      let err=new Error('Problema con actualizacion de municipio '+municipality)
        traza.trazaDTO.error=err.name+' => '+err.message;
        traza.trazaDTO.update='';
        traza.save()
        return err.toString();
    }
    traza.trazaDTO.update=updated;    
    traza.trazaDTO.error='Ok';
    traza.save()
    return this.toEntity(updated);
  }

  async remove(id: string , traza:TrazasService ): Promise<Municipality | string> {
    traza.trazaDTO.filter= JSON.stringify ({_id:id}) ;
    traza.trazaDTO.operation='remove';
    let hijos=await this.cstvldt.validate_onTable('Consejo_Popular_Municipal',{'municipio':id},IS_NOT_DELETED);
    console.log('hijos',hijos);
    if (hijos!=0) { //tienes hijos no te borras  
      let error=new ObjectCanNotDeleted (MODULE,id,hijos );
      traza.trazaDTO.error= error ;
      traza.save();
      return error.toString();
    }
    let bf=await this.findOne(id);
    traza.trazaDTO.before=bf;      
    const munic = await this.municipalityModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        isDeleted: true,
      },
    );

    if (!munic) {
       let err=new Error('Problema con eliminacion de municipio '+  id)
        traza.trazaDTO.error=err;
        traza.trazaDTO.update='';
        traza.save()
        return err.toString();
    }

    traza.trazaDTO.update=munic;    
    traza.trazaDTO.error='Ok';
    traza.save()
    return this.toEntity(munic);
  }

  async search(query:SearchMunicipalityDto): Promise<Municipality[] | string> {
    
    let dltd= query.isDeleted? { isDeleted:true} :  { };
    let buscar= query.exactName ? { name:query.name} :  { name: { $regex:query.name , $options:'i'} };
    // let prvId= query.province!=''|| query.province!=undefined ? {province:query.province}: {};
    let prvId= !query.province ? {} : {province:query.province};
    let queryS={...prvId,...buscar,...dltd};
    console.log('consl-', queryS);
    const municipalities = await this.municipalityModel
      .find().where(queryS)
      .populate('province')
      .exec();
    console.log('busq', municipalities);
    
    const municipalityCollection = municipalities.map((municipality) =>
      this.toEntity(municipality),
    );
    return municipalityCollection;
  }

  private toEntity(municipality: MunicipalityDocument): Municipality {
    return extractMunicipality(municipality)
    /*{
      id: municipality._id.toString(),
      name: municipality.name,
      isDeleted:municipality.isDeleted,
      updatedAt: municipality.updatedAt,
      createdAt: municipality.createdAt,
      province: municipality.province /* {
        _id: municipality.province._id,
        name: municipality.province.name,
        isDeleted:municipality.province.isDeleted,
        updatedAt: municipality.province.updatedAt,
        createdAt: municipality.province.createdAt,
      },
    };*/
  }
}
