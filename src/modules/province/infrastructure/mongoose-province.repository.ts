import { Injectable, Module } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { ProvinceRepository } from '../domain/repository/province.repository';
import { DataList } from 'src/modules/common/data-list';
import { CreateProvinceDto } from '../domain/dto/create-province.dto';
import { UpdateProvinceDto } from '../domain/dto/update-province.dto';
import { ProvinceEntity } from '../domain/entities/province.entity';
import { ProvinceDocument, ProvinceModel } from './province.schema';
import { ObjectCanNotDeleted, ObjectId_NotFound, ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';
import { validateId_Format } from 'src/modules/common/helpers/id-validator';
import { DuplicatedValueError } from 'src/modules/common/errors/duplicated-value.error';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { IsRelationshipProvider } from 'src/modules/common/helpers/customIdValidation';
import { SearchProvinceDto } from '../domain/dto/search-province.dto';
import { extractProvince } from 'src/modules/common/extractors';

// const SELECT_QUERY: string = 'isDeleted name createdAt updatedAt';
const MODULE = 'Province';

@Injectable()
export class MongooseProvinceRepository implements ProvinceRepository {
  private whereQuery = { isDeleted: false };
  private cstvldt: IsRelationshipProvider 
  constructor(
    @InjectModel(ProvinceModel.name)
    private provinceModel: Model<ProvinceDocument>, 
    @InjectConnection() private cnn: Connection,
    // @Inject() 
  ) {  this.cstvldt=new IsRelationshipProvider(this.cnn)    }

  async findAll(page: number, pageSize: number): Promise<DataList<ProvinceEntity>| string> {
    const skipCount = (page - 1) * pageSize;
    
    const provinces = await this.provinceModel
        .find(this.whereQuery)
        .skip(skipCount)
        .limit(pageSize)
        .lean()
        .exec()
      ;

    const provinceCollection = provinces.map(province => 
     {
      return this.toEntity(province);
     }    
   );

    const dataList: DataList<ProvinceEntity> = {
      data: provinceCollection,
      totalPages: Math.ceil(provinceCollection.length / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(province: CreateProvinceDto,traza:TrazasService): Promise<ProvinceEntity | string> {
      let crt=null;

      traza.trazaDTO.filter= JSON.stringify(province);
      
      let todos= await Promise.all(
                            [this.provinceModel
                            .find({})
                            .exec()]
                          )
      let us= todos[0].map((data) =>{
                let dt=data.name.trim().toLowerCase()
                    ,dt_c=province.name.trim().toLowerCase();
                console.log(dt,dt_c);
                if (dt==dt_c) {
                  let err=new DuplicatedValueError( data.name + ' -> ' + MODULE);
                  traza.trazaDTO.error=err;
                  traza.save();
                  return err.toString();
                }
              })
      try {
        crt= this.toEntity ( await new this.provinceModel(province).save());
        traza.trazaDTO.update= crt.toString();
        traza.save();
        
      } catch (error) {
          traza.trazaDTO.error= error ;
          traza.save();
          return error.toString();
      }            
      return crt;     
  }

  async findOne(id: string): Promise<ProvinceEntity | string> {
    validateId_Format(id, MODULE);

    const province = await this.provinceModel
      .findById(id)
      .where(this.whereQuery);

    if (!province) {
      return (new ObjectNotFound(MODULE)).toString();
    }

    return this.toEntity (province)
    
  }

  async update(province: UpdateProvinceDto, traza:TrazasService): Promise<ProvinceEntity | string> {
    validateId_Format(province.id, MODULE);
    let dco_find=  await this.provinceModel.findById({ _id: province.id, ...this.whereQuery });

    let ee=null;
    let upd=null;
    if (!dco_find) {
      ee='No existe documento id'+province.id;
      
      traza.trazaDTO.error= ee ;
      traza.save();
      return ee;
    } else {
      traza.trazaDTO.filter= JSON.stringify(province);    
      try {
              upd=  await this.provinceModel.findByIdAndUpdate(
                { _id: province.id, ...this.whereQuery} ,
                province,
                {
                  new: true,
                },
              );            
            traza.trazaDTO.before=JSON.stringify(dco_find);
            traza.trazaDTO.update=JSON.stringify(upd);            
            traza.save() ; 
        } catch (error) {
          traza.trazaDTO.error= JSON.stringify(error) ;
          traza.save();
          return error.toString();
        }  
    }      
    return this.toEntity (upd) ;  // 
  }

   async remove(id: string, traza:TrazasService): Promise< ProvinceEntity | string>  {
   console.log('remove ', traza);
    traza.trazaDTO.update='';
    //no se porque no funciona
    // validateId_OnTable(this.cnn,'provinces','{_id:$oid:{{'+id+'}}}',this.whereQuery)
    // let pp=await this.cstvldt.validateId_onTable('provinces',id);
    // console.log('pp',pp); 
     traza.trazaDTO.filter= JSON.stringify ({_id:id}) ;
/* si existes */
    let dco_find=null;
    let upd=null;
    try {
      dco_find=await this.cstvldt.validateId_onTable('provinces',id);
      console.log('prov exis', dco_find); 
    } catch (error) {
      let pp=new ObjectId_NotFound(MODULE,id);
      traza.trazaDTO.error=pp;      
      traza.save();
      return pp.toString();
    }      
//Id_OnTable buscar por hijos
    let mnc= await this.cstvldt.validate_onTable('municipalities',{'province':id},this.whereQuery)// si esta en BD 
    console.log('hjos prv ',mnc);
    if (mnc) { //tienes hijos no te borras  
      let error=new ObjectCanNotDeleted(MODULE,id,mnc) ;
      traza.trazaDTO.error= error ;
      traza.save();
      return error.toString();
    } else {
      // no tienes hijos no te borras 
      traza.trazaDTO.filter= JSON.stringify({ isDeleted: true });    
      try {
            let bf= this.findOne(id) ; 
            console.log('antes', bf)
            upd=  await this.provinceModel.findByIdAndUpdate(
                { _id: id, ...this.whereQuery} ,
                { isDeleted: true },
                {
                  new: true,
                },
              );
            console.log('antes', upd)              
            traza.trazaDTO.before=JSON.stringify(bf);
            traza.trazaDTO.update=JSON.stringify(this.toEntity (upd));            
            traza.save() ; 
            return this.toEntity (upd) // 
        } catch (error) {
          traza.trazaDTO.error= JSON.stringify (error) ;
          traza.save();
          return traza.trazaDTO.error.toString();
        }// end try            
    }//end if check childs    
  }

  async search(query:SearchProvinceDto) : Promise<ProvinceEntity[] | string> {

    let buscar= query.exactName? { name:query.exactName, isDeleted: query.isDeleted} :  { name: { $regex:query.name , $options:'i'}, isDeleted: query.isDeleted };
    console.log(buscar);
    
     let result=[];
    const provinceCollection =await this.provinceModel.find(buscar).exec();
    //console.log(provinceCollection);
    
     provinceCollection.map((item) =>
      result.push(this.toEntity(item))//
    );
    return result;
  }

  toEntity(prov:ProvinceModel): ProvinceEntity {
    return extractProvince(prov) ;
  }
}
