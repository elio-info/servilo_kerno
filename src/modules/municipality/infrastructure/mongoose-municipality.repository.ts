import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection, Model, Mongoose } from 'mongoose';

import { DataList } from 'src/modules/common/data-list';
import { ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';
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

  async findAll( page: number, pageSize: number,): Promise<DataList<Municipality>> {
    const skipCount = (page - 1) * pageSize;

    const [municipalities, count] = await Promise.all([
      this.municipalityModel
        .find(IS_NOT_DELETED)
        .skip(skipCount)
        .limit(pageSize)
       .populate('province')
        .exec(),
      this.municipalityModel.countDocuments(IS_NOT_DELETED).exec(),
    ]);
    // console.log(municipalities);
    
    const municipalityCollection = municipalities.map((municipality) =>
      this.toEntity(municipality),
    );

    const dataList: DataList<Municipality> = {
      data: municipalityCollection,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(municipality: CreateMunicipalityDto,traza:TrazasService): Promise<Municipality> {
    traza.trazaDTO.operation='save';
    traza.trazaDTO.filter=municipality;

    let crt = await this.cstvldt.validateId_onTable('provinces',municipality.province);
    console.log('existe '+municipality.province+' ?'+crt);
    
    if (crt>0) { 
      try {
        let mnc=await new this.municipalityModel(municipality).save();
        traza.trazaDTO.update=JSON.stringify (municipality);
        traza.trazaDTO.before=''
        traza.trazaDTO.error='Ok';
        traza.save();        
        return this.toEntity(mnc );        
      } catch (error) {
      let err=new Error('Problema al crear el municipio '+municipality)
        traza.trazaDTO.error=err.name+' => '+err.message;
        traza.save()
        throw err;  
      }           
    } else {
      let err=new Error('Problema con provincia dada '+municipality.province)
        traza.trazaDTO.error=err.name+' => '+err.message;
        traza.save()
        throw err;
      }
  }

  async findOne(id: string): Promise<Municipality> {
    validateId(id, MODULE);

    const municipality = await this.municipalityModel
      .findById(id)
      .where(IS_NOT_DELETED)
      .populate('province');

    if (!municipality) {
      throw new ObjectNotFound(MODULE);
    }

    return this.toEntity(municipality);
  }

  async update( id: string,  municipality: UpdateMunicipalityDto,traza:TrazasService ): Promise<Municipality> {
    traza.trazaDTO.filter=municipality;
    traza.trazaDTO.operation='update';
    let crt = await this.cstvldt.validateId_onTable('province',municipality.province);//,IS_NOT_DELETED
    if (crt<=0) {
      let err=new Error('Problema con provincia dada '+municipality.province)
        traza.trazaDTO.error=err.name+' => '+err.message;
        traza.save()
        throw err;  
      }
    let bf=this.findOne(id);
    traza.trazaDTO.before=bf;  
    const updated = await this.municipalityModel.findOneAndUpdate(
      { _id: id, ...IS_NOT_DELETED },
      municipality,
      { new: true, populate: 'province' },
    );

    if (!updated) {
      let err=new Error('Problema con actualizacion de municipio '+municipality)
        traza.trazaDTO.error=err.name+' => '+err.message;
        traza.trazaDTO.update='';
        traza.save()
        throw err;
    }
    traza.trazaDTO.update=updated;    
    traza.trazaDTO.error='Ok';
    traza.save()
    return this.toEntity(updated);
  }

  async remove(id: string , traza:TrazasService ): Promise<Municipality> {
    traza.trazaDTO.filter= JSON.stringify ({_id:id}) ;
    traza.trazaDTO.operation='remove';
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
    const document = await this.municipalityModel.findOneAndUpdate(
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
  }

  async search(query) {
    console.log(query);
    let prvId= query.provinceId!=undefined? {province:query.provinceId}: {};
    let queryS={...prvId}
    const municipalities = await this.municipalityModel
      .find(queryS)
      .populate('province');
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
