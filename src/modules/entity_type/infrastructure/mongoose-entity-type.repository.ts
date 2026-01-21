import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { EntityTypeRepository } from '../domain/repository/entity-type.repository';
import { DataList } from 'src/modules/common/data-list';
import { CreateEntityTypeDto } from '../domain/dto/create-entity-type.dto';
import { UpdateEntityTypeDto } from '../domain/dto/update-entity-type.dto';
import { EntityType } from '../domain/entities/entity-type.entity';
import { EntityTypeDocument, EntityTypeModel } from './entity-type.schema';
import { ObjectCanNotDeleted, ObjectNotFound } from '../../common/errors/object-not-found.error';
import { DuplicatedValueError } from '../../common/errors/duplicated-value.error';
import { extractEntityType } from 'src/modules/common/extractors';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { IsRelationshipProvider } from 'src/modules/common/helpers/customIdValidation';
import { SearchEntityTypeDto } from '../domain/dto/search-entity-type.dto';

@Injectable()
export class MongooseEntityTypeRepository implements EntityTypeRepository {
  private WHERE_QUERY = { isDeleted: false };
  private MODULE = 'Entity Type';
  private cstvldt: IsRelationshipProvider
  constructor(
    @InjectModel(EntityTypeModel.name)
    private entTypeModel: Model<EntityTypeModel>,
  @InjectConnection() private cnn: Connection,
  ) {  this.cstvldt=new IsRelationshipProvider(this.cnn)    }

  async findAll(page: number, pageSize: number): Promise<DataList<EntityType>|string> {
    const skipCount = (page - 1) * pageSize;

    const entTypes =await this.entTypeModel
        .find(this.WHERE_QUERY)
        .skip(skipCount)
        .limit(pageSize)
        .exec();

    const entTypeCollection: EntityType[] = entTypes.map (entity => this.toEntity(entity) );

    const dataList: DataList<EntityType> = {
      data: entTypeCollection,
      totalPages: Math.ceil(entTypeCollection.length/ pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(entType: CreateEntityTypeDto, traza:TrazasService): Promise<EntityType|string> {
     traza.trazaDTO.filter= entType;
    let todos= await Promise.all(
                            [this.entTypeModel
                            .find({})
                            .exec()]
                          )
      let us= todos[0].map((data) =>{
                let dt=data.name.trim().toLowerCase()
                    ,dt_c=entType.name.trim().toLowerCase();
                console.log(dt,dt_c);
                if (dt==dt_c) {
                  let err=new DuplicatedValueError( data.name + ' -> ' + this.MODULE);
                  traza.trazaDTO.error=err;
                  traza.save();
                  return err.toString();
                }
              })
      let   crt=null;     
      try {
         crt= this.toEntity ( await new this.entTypeModel(entType).save());
        traza.trazaDTO.update= crt.toString();
        traza.save();
        
      } catch (error) {
          traza.trazaDTO.error= error ;
          traza.save();
          return error.toString();
      }            
      return crt; 
  }

  async findOne(id: string): Promise<EntityType|string> {
   
    const entType = await this.entTypeModel
      .findById(id)
      .where(this.WHERE_QUERY);

    if (!entType) {
      throw new ObjectNotFound(this.MODULE);
    }

    return this.toEntity(entType);
  }

  async update(entType: UpdateEntityTypeDto, traza:TrazasService): Promise<EntityType|string> {
    // validateId(id, this.MODULE);

    const document = await this.entTypeModel.findOneAndUpdate(
      { _id: entType.id, ...this.WHERE_QUERY },
      entType,
      {
        new: true,
      },
    );
    return this.toEntity(document);
  }

  async remove(id: string, traza:TrazasService) {
    traza.trazaDTO.filter= {_id:id} ;
    //Id_OnTable buscar por hijos
    let mnc= await this.cstvldt.validate_onTable('entity',{'entityType':id},this.WHERE_QUERY)// si esta en BD 
    console.log('hjos prv ',mnc);
    if (mnc) { //tienes hijos no te borras  
      let error=new ObjectCanNotDeleted(this.MODULE,mnc) ;
      traza.trazaDTO.error= error ;
      traza.save();
      return error.toString();
    } else {
      // no tienes hijos no te borras 
      traza.trazaDTO.filter= { isDeleted: true };    
      try {
            let bf= this.findOne(id) ; 
            console.log('antes', bf)
           let upd=  await this.entTypeModel.findByIdAndUpdate(
                { _id: id, ...this.WHERE_QUERY} ,
                { isDeleted: true },
                {
                  new: true,
                },
              );
            console.log('antes', upd)              
            traza.trazaDTO.before=bf;
            traza.trazaDTO.update=this.toEntity (upd);            
            traza.save() ; 
            return this.toEntity (upd) // 
        } catch (error) {
          traza.trazaDTO.error= error ;
          traza.save();
          return traza.trazaDTO.error.toString();
        }// end try            
    }//end if check childs    
  } 
 

  async search(query:SearchEntityTypeDto) {
    console.log('ent-type', query);
    
    let dltd= query.deleted? { isDeleted:true} :  this.WHERE_QUERY;
    let buscar={}
    if (!!query.name) {//existe nombre
      if (!!query.exactName) { buscar[' name']=query.exactName ; }
      else
      {buscar ['name']= { $regex:query.name , $options:'i'};}
    }    
    let hrc= !query.hierarchy ? {} : {hierarchy:query.hierarchy};
    let queryS={...hrc,...buscar,...dltd};
    console.log('consl-', queryS);
    const ents = await this.entTypeModel.find(queryS).exec();
    console.log('consl-', ents);
    const entCollection = ents.map((entType) => this.toEntity(entType));
    return entCollection;
  }

  private toEntity(entType: EntityTypeDocument): EntityType {
    return extractEntityType(entType)
    /*{
      id: entType._id.toString(),
      name: entType.name,
      hierarchy: entType.hierarchy,
      updatedAt: entType.updatedAt,
      createdAt: entType.createdAt,
    };*/
  }
}
