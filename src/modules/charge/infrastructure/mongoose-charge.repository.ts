import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { ChargeRepository } from '../domain/repository/charge.repository';
import { DataList } from 'src/modules/common/data-list';
import { CreateChargeDto } from '../domain/dto/create-charge.dto';
import { UpdateChargeDto } from '../domain/dto/update-charge.dto';
import { Charge_Entity } from '../domain/entities/charge.entity';
import { ChargeDocument, ChargeModel } from './charge.schema';
import { WrongIdFormat } from '../../common/errors/wrong-id-format.error';
import { ObjectCanNotDeleted, ObjectNotFound } from '../../common/errors/object-not-found.error';
import { validateId } from '../../common/helpers/id-validator';
import { DuplicatedValueError, SearchDuplicate_NameValue } from '../../common/errors/duplicated-value.error';
import { IsRelationshipProvider } from 'src/modules/common/helpers/customIdValidation';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

@Injectable()
export class MongooseChargeRepository implements ChargeRepository {
  private WHERE_QUERY = { isDeleted: false };
  private MODULE = 'Charge';
  private cstvldt: IsRelationshipProvider;  
  constructor(
    @InjectModel(ChargeModel.name)
    private chargeModel: Model<ChargeModel>,
  ) {
      this.cstvldt= new IsRelationshipProvider(chargeModel.db );
  }

  async findAll(page: number, pageSize: number): Promise<DataList<Charge_Entity>> {
    const skipCount = (page - 1) * pageSize;

    const [charges, count] = await Promise.all([
      this.chargeModel
        .find(this.WHERE_QUERY)
        .skip(skipCount)
        .limit(pageSize)
        .exec(),
      this.chargeModel.countDocuments(this.WHERE_QUERY).exec(),
    ]);

    const chargeCollection: Charge_Entity[] = charges.map((charge) =>
      this.toEntity(charge),
    );

    const dataList: DataList<Charge_Entity> = {
      data: chargeCollection,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(charge: CreateChargeDto,traza:TrazasService): Promise<Charge_Entity | string> {
    let nomb=charge.name
    
    console.log(this.MODULE+ ' estoy en creat '+ nomb);
    let dep=await SearchDuplicate_NameValue(this.MODULE, this.chargeModel,['name'],[ nomb],traza);

     if ( dep.trazaDTO.error!='Ok'  ) {
      dep.save();
      return dep.terror()  ; 
    }

    try {
      let ch= await new this.chargeModel(charge).save();
      let crt = this.toEntity( ch );
      traza.trazaDTO.update=crt;
       traza.save();
      return crt;
    } catch (e) {
      traza.trazaDTO.update='';
      traza.trazaDTO.error=e;
       traza.save();
      return traza.terror();
    }
  }

  async findOne(id: string): Promise<Charge_Entity|string> {
    validateId(id, this.MODULE);

    const charge = await this.chargeModel.findById(id).where(this.WHERE_QUERY);

    try {      
    return this.toEntity(charge);
    } catch (error) {
      return error.toString();
    }    
  }

  async update(charge: UpdateChargeDto, traza:TrazasService): Promise<Charge_Entity | string> {
   
    console.log(charge);
    
    try {
       const document = await this.chargeModel.findOneAndUpdate(
      { _id: charge.id, ...this.WHERE_QUERY },
      charge,     {        new: true,      },
    );
    if (!document) {
        let err=new Error('Problema con actualizacion de '+this.MODULE)
        traza.trazaDTO.error=err;
        traza.trazaDTO.update='';
        traza.save()
        return err.toString();
        }
        // traza.trazaDTO.before=antes;
        traza.trazaDTO.update=document;    
        traza.save()      
    return this.toEntity(document);
    } catch (error) {
        traza.trazaDTO.error=error;
        traza.trazaDTO.update='';
        traza.save()
        return error.toString();
    }
   
  }

  async remove(id: string,traza:TrazasService): Promise<Charge_Entity | string> {
    
    let rem= await this.cstvldt.validate_onTable('persons',{'charge.id':id,isDeleted:false});

    if (rem>0) {
      let err=new ObjectCanNotDeleted(this.MODULE, rem)
      traza.trazaDTO.error=err;      
      traza.trazaDTO.update='';
      traza.save()
    return err.toString();
    }
    try {
      const document = await this.chargeModel
      .findById(id)
      .where(this.WHERE_QUERY);
      traza.trazaDTO.before=document;

      let rmv= await this.chargeModel.findByIdAndUpdate(id,{isDeleted:true})
      traza.trazaDTO.error='Ok';
      traza.trazaDTO.update=rmv;    
      traza.save() ;
      
      return this.toEntity(rmv);
    } catch (error) {
       traza.trazaDTO.error=error;      
        traza.trazaDTO.update='';
        traza.save()
      return error.toString(); 
    
     }
  }


  async search(query) {
    const charges = await this.chargeModel.find(query);
    const chargeCollection = charges.map((charge) => this.toEntity(charge));
    return chargeCollection;
  }

  private toEntity(charge: ChargeDocument): Charge_Entity {
    return {
      id: charge._id.toString(),
      name: charge.name,
      entity:charge.entity,
      access:charge.access,
      subord:charge.subord,
      isDeleted:charge.isDeleted,
      updatedAt: charge.updatedAt,
      createdAt: charge.createdAt,
    };
  }
}
