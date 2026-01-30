import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { DataList } from 'src/modules/common/data-list';
import { ObjectCanNotDeleted, ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';
import { Entity_Entity } from '../domain/entities/entity.entity';
import { EntityDocument, EntityModel } from './entity.schema';
import { CreateEntityDto } from '../domain/dto/create-entity.dto';
import { UpdateEntityDto } from '../domain/dto/update-entity.dto';
import { DuplicatedValueError, SearchDuplicateValue } from 'src/modules/common/errors/duplicated-value.error';
import {
  extractEntityType,
  extractMunicipality,
  extractPlace,
} from '../../common/extractors';
import { validateId } from 'src/modules/common/helpers/id-validator';
import { EntityRepository } from '../domain/repository/entity.repository';
import { IsRelationshipProvider } from 'src/modules/common/helpers/customIdValidation';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { SearchEntityDto } from '../domain/dto/search-entity.dto';

@Injectable()
export class MongooseEntityRepository implements EntityRepository {

private POPULATE_PATH = {
  entityType: { path: 'entityType' },
  municipality: { path: 'municipality', populate: { path: 'province' } },
  place: {
    path: 'place',
    populate: { path: 'municipality', populate: { path: 'province' } },
  },
};
private MODULE = 'Entity';
private IS_NOT_DELETED = { isDeleted: false };
private  cstvldt: IsRelationshipProvider;

  constructor(
    @InjectModel(EntityModel.name)
    private entityModel: Model<EntityModel>,
  @InjectConnection() private cnn: Connection,
  ) { this.cstvldt= new IsRelationshipProvider(this.cnn)}

  async findAll(page: number, pageSize: number): Promise<DataList<Entity_Entity> | string> {
    const skipCount = (page - 1) * pageSize;

    const entities = await 
      this.entityModel
        .find(this.IS_NOT_DELETED)
        .skip(skipCount)
        .limit(pageSize)
        .populate(this.POPULATE_PATH.municipality)
        .populate(this.POPULATE_PATH.entityType)
        .populate('parentId')
        .populate(this.POPULATE_PATH.place)
        .exec();
    const entityCollection = entities.map((entity) => this.toEntity(entity));

    const dataList: DataList<Entity_Entity> = {
      data: entityCollection,
      totalPages: Math.ceil(entities.length / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(entity: CreateEntityDto, traza:TrazasService): Promise<Entity_Entity| string> {

    let crt_dual=await SearchDuplicateValue(this.MODULE,this.entityModel,['name','municipality'],[entity.name,entity.municipality],traza)
    if (crt_dual.trazaDTO.error!='Ok') {
      return crt_dual.trazaDTO.error.toString();
    }

    try {
      let ent=await new this.entityModel(entity).save();
      traza.trazaDTO.update=entity;
      traza.trazaDTO.before=''
      traza.trazaDTO.error='Ok';
      traza.save();
      let buscar=ent._id.toString();
      return await this.findOne(buscar);
    } catch (error) {
        console.log('error salva',error);          
        let err=new Error('Problema al crear '+entity.name)
          traza.trazaDTO.error=error;
          traza.save()
          return error.toString(); 
    }
  }

  async findOne(id: string): Promise<Entity_Entity|string> {
    // validateId(id, this.MODULE);

    const entity = await this.entityModel
      .findById(id)
      .where(this.IS_NOT_DELETED)
      .populate(this.POPULATE_PATH.municipality)
      .populate(this.POPULATE_PATH.entityType)
      .populate('parentId')
      .populate(this.POPULATE_PATH.place);
    if (!entity) {
      return (new ObjectNotFound(this.MODULE)).toString();
    }

    return this.toEntity(entity);
  }

  async update(entity: UpdateEntityDto, traza:TrazasService): Promise<Entity_Entity| string> {
    // validateId(id, this.MODULE);
    let crt_dual=await SearchDuplicateValue(this.MODULE,this.entityModel,['name','municipality'],[entity.name,entity.municipality],traza)
    if (crt_dual.trazaDTO.error!='Ok') {
      return crt_dual.trazaDTO.error.toString();
    }
    try {
      traza.trazaDTO.before= await this.findOne(entity.id)
      const upd = await this.entityModel
      .findOneAndUpdate({ _id: entity.id, ...this.IS_NOT_DELETED }, entity, {
        new: true,
        populate: { path: 'municipality', populate: { path: 'province' } },
      })
      .populate(this.POPULATE_PATH.municipality)
      .populate(this.POPULATE_PATH.entityType)
      .populate('parentId')
      .populate(this.POPULATE_PATH.place);
      traza.trazaDTO.update=upd;      
      traza.trazaDTO.error='Ok';
      traza.save();
      return this.findOne(upd._id.toString());
    } catch (error) {
       console.log('error salva',error);          
        // let err=new Error('Problema al crear '+entity.name)
          traza.trazaDTO.error=error;
          traza.save()
          return error.toString();
    }
    
    
  }

  async remove(id: string, traza:TrazasService): Promise<Entity_Entity | string> {
    
    let hijos=await this.cstvldt.validate_onTable('control_actividadcultural',{'entidad_responsable':id},this.IS_NOT_DELETED);
        console.log('hijos',hijos);
        if (hijos!=0) { //tienes hijos no te borras  
          let error=new ObjectCanNotDeleted (this.MODULE,hijos );
          traza.trazaDTO.error= error ;
          traza.save();
          return error.toString();
        }
        traza.trazaDTO.before= await this.findOne(id)
    const document = await this.entityModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        isDeleted: true,
      },
    );

    if (!document) {
      throw new ObjectNotFound(this.MODULE);
    }
  }
  async search(query) {
    const ents = await this.entityModel
      .find(query)
      .populate(this.POPULATE_PATH.municipality)
      .populate(this.POPULATE_PATH.entityType)
      .populate('parentId')
      .populate(this.POPULATE_PATH.place);
    const entCollection = ents.map((ent) => this.toEntity(ent));
    return entCollection;
  }

  private toEntity(entity: EntityDocument): Entity_Entity {
    return {
      id: entity._id.toString(),
      entityType: extractEntityType(entity.entityType),
      parentId: entity.parentId ? entity.parentId._id.toString() : null,
      name: entity.name,
      nivel: entity.nivel,
      nitCode: entity.nitCode,
      abbreviation: entity.abbreviation,
      resolution: entity.resolution,
      resolutionDate: entity.resolutionDate,
      issuedBy: entity.issuedBy,
      domicilie: entity.domicilie,
      municipality: extractMunicipality(entity.municipality),
      place: extractPlace(entity.place),
      reeup: entity.reeup,
      commercialRegister: entity.commercialRegister,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    };
  }
}
