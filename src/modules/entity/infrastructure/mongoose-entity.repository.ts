import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { DataList } from 'src/modules/common/data-list';
import { ObjectCanNotDeleted, ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';
import { Entity_Entity } from '../domain/entities/entity.entity';
import { EntityDocument, EntityModel } from './entity.schema';
import { CreateEntityDto } from '../domain/dto/create-entity.dto';
import { UpdateEntityDto } from '../domain/dto/update-entity.dto';
import { DuplicatedValueError, SearchDuplicate_KeysValue } from 'src/modules/common/errors/duplicated-value.error';
import {
  extractEntity,
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
  consejo_p: {
    path: 'consejo_p',
    populate: { path: 'municipality', populate: { path: 'province' } },
  },
};
private MODULE = 'Entity';
private IS_NOT_DELETED = { isDeleted: false };
private  cstvldt: IsRelationshipProvider;

  constructor(
    @InjectModel(EntityModel.name) private entityModel: Model<EntityModel>,
  @InjectConnection() private cnn: Connection,
  ) { this.cstvldt= new IsRelationshipProvider(this.cnn)}

  async findAll(page: number, pageSize: number): Promise<DataList<Entity_Entity> | string> {
    const skipCount = (page - 1) * pageSize;
   
       let entities =null;
      try {  
        entities= await this.entityModel
        .find(this.IS_NOT_DELETED)
        // .skip(skipCount)
        // .limit(pageSize)
       .populate(this.POPULATE_PATH.municipality)
        .populate(this.POPULATE_PATH.entityType)
        .populate('parentId')
        .populate(this.POPULATE_PATH.consejo_p)
        .exec();
   console.log(entities);
   
    } catch (error) {
      console.log(error);
      
    }
    const entityCollection = entities.map((entity) => extractEntity(entity));

    const dataList: DataList<Entity_Entity> = {
      data: entityCollection,
      totalPages: Math.ceil(entities.length / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(entity: CreateEntityDto, traza:TrazasService): Promise<Entity_Entity| string> {

    let crt_dual=await SearchDuplicate_KeysValue(this.MODULE,this.entityModel,['name','municipality'],[entity.name,entity.municipality],traza)
    if (crt_dual.trazaDTO.error!='Ok') {
      return crt_dual.trazaDTO.error.toString();
    }
    console.log('paso SearchKey');
    
    try {
      let ent=await new this.entityModel(entity).save();
      traza.trazaDTO.update=ent;
      traza.trazaDTO.before=''
      traza.trazaDTO.error='Ok';
      traza.save();
      console.log('save ',ent);
      
      return extractEntity(ent);
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
      // .populate('parentId')
      .populate(this.POPULATE_PATH.consejo_p);
    if (!entity) {
      return (new ObjectNotFound(this.MODULE)).toString();
    }

    return extractEntity(entity);
  }

  async update(entity: UpdateEntityDto, traza:TrazasService): Promise<Entity_Entity| string> {
    // validateId(id, this.MODULE);
    let crt_dual=await SearchDuplicate_KeysValue(this.MODULE,this.entityModel,['name','municipality'],[entity.name,entity.municipality],traza)
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
      //.populate('parentId')
      .populate(this.POPULATE_PATH.consejo_p);
      traza.trazaDTO.update=upd;      
      traza.trazaDTO.error='Ok';
      traza.save();
      return extractEntity(upd);
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
    traza.trazaDTO.before= await this.findOne(id);
    const document = await this.entityModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        isDeleted: true,
      },
    );

    if (!document) {
      let error=new ObjectNotFound(this.MODULE);
      traza.trazaDTO.error= error ;
      traza.save();
      return error.toString();
    }
    traza.trazaDTO.filter={id:id} ;
    traza.trazaDTO.update='' ;
      traza.save();
      return extractEntity(document);
  }

  async search(query:SearchEntityDto) :  Promise<Entity_Entity[]|string>{
    const ents = await this.entityModel
      .find(query)
      .populate(this.POPULATE_PATH.municipality)
      .populate(this.POPULATE_PATH.entityType)
      //.populate('parentId')
      .populate(this.POPULATE_PATH.consejo_p);
    const entCollection = ents.map((ent) => extractEntity(ent));
    return entCollection;
  }

  /*
  private toEntity(entityMdl: EntityModel): Entity_Entity {
    return {
      id: entityMdl._id.toString(),
      entityType: entityMdl.entityType._id.toString(), //extractEntityType(entity.entityType),
      parentId: !!entityMdl.parentId._id ? entityMdl.parentId._id.toString() : '',
      name: entityMdl.name,
      nivel: entityMdl.nivel,
      nitCode: entityMdl.nitCode,
      abbreviation: entityMdl.abbreviation,
      resolution: entityMdl.resolution,
      resolutionDate: entityMdl.resolutionDate,
      issuedBy: entityMdl.issuedBy,
      domicilie: entityMdl.domicilie,
      municipality: entityMdl.municipality._id.toString(),// extractMunicipality(entityMdl.municipality),
      place: entityMdl.place._id.toString(),//extractPlace(entityMdl.place),
      reeup: entityMdl.reeup,
      commercialRegister: entityMdl.commercialRegister,
      updatedAt: entityMdl.updatedAt,
      createdAt: entityMdl.createdAt,
    };
  }
    */
}
