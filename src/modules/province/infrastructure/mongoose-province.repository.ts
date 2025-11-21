import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { ProvinceRepository } from '../domain/repository/province.repository';
import { DataList } from 'src/modules/common/data-list';
import { CreateProvinceDto } from '../domain/dto/create-province.dto';
import { UpdateProvinceDto } from '../domain/dto/update-province.dto';
import { Province } from '../domain/entities/province.entity';
import { ProvinceDocument, ProvinceModel } from './province.schema';
import { WrongIdFormat } from 'src/modules/common/errors/wrong-id-format.error';
import { ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';
import { validateId } from 'src/modules/common/helpers/id-validator';
import { DuplicatedValueError } from 'src/modules/common/errors/duplicated-value.error';
import {  TrazasService } from 'src/cultura/trazas/trazas.service';
import { CreateTrazaDto } from 'src/cultura/trazas/dto/create-traza.dto';
import { log } from 'console';
import { ValidationError } from 'class-validator';
import { ifError } from 'assert';
import { ObjectDoesNotExist } from 'src/modules/domain/errors/object-doesnt-exist.error';
import { MongooseMunicipalityRepository } from 'src/modules/municipality/infrastructure/mongoose-municipality.repository';
import { MunicipalityDocument, MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';
import { MunicipalityService } from 'src/modules/municipality/application/municipality.service';

// const SELECT_QUERY: string = 'isDeleted name createdAt updatedAt';
const MODULE = 'Province';

@Injectable()
export class MongooseProvinceRepository implements ProvinceRepository {
  private whereQuery = { isDeleted: false };
  
  constructor(
    @InjectModel(ProvinceModel.name)
    private provinceModel: Model<ProvinceDocument>, 
   
  ) {      }

  async findAll(page: number, pageSize: number): Promise<DataList<Province>> {
    const skipCount = (page - 1) * pageSize;
    
    const [provinces, count] = await Promise.all([
      this.provinceModel
        .find(this.whereQuery)
        .skip(skipCount)
        .limit(pageSize)
        .lean()
        .exec(),
      this.provinceModel.countDocuments(this.whereQuery).exec(),
    ]);

    // console.log('dentro del F-all', provinces);
   
    const provinceCollection = provinces.map((province) => ({
      id: province._id.toString(),
      name: province.name,
      isDeleted:province.isDeleted,
      is_Deleted:province.is_Deleted,
      createdAt: province.createdAt,
      updatedAt: province.updatedAt,
    }));

    const dataList: DataList<Province> = {
      data: provinceCollection,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(province: CreateProvinceDto,traza:TrazasService): Promise<ProvinceModel> {
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
                  throw err;
                }
              })
      try {
        crt= this.toEntity ( await new this.provinceModel(province).save());
        traza.trazaDTO.update= crt.toString();
        traza.save();
        // this.prv_trazaSrv.create(province,crt,traza.traza_Usr)
      } catch (error) {
          traza.trazaDTO.error= error.toString() ;
          traza.save();
          throw error;
      }            
      return crt;     
  }

  async findOne(id: string): Promise<Province> {
    validateId(id, MODULE);

    const province = await this.provinceModel
      .findById(id)
      .where(this.whereQuery);

    if (!province) {
      throw new ObjectNotFound(MODULE);
    }

    return {
      id: province._id.toString(),
      name: province.name,
      isDeleted:province.isDeleted,is_Deleted:province.is_Deleted,
      updatedAt: province.updatedAt,
      createdAt: province.createdAt,
    };
  }

  async update(id: string, province: UpdateProvinceDto, traza:TrazasService): Promise<Province> {
    // validateId(id, MODULE);
    let dco_find=  await this.provinceModel.findById({ _id: id, ...this.whereQuery });

    let ee=null;
    let upd=null;
    if (!dco_find) {
      ee='No existe documento id'+id;
      
      traza.trazaDTO.error= ee ;
      traza.save();
      throw ee;
    } else {
      traza.trazaDTO.filter= JSON.stringify(province);    
      try {
              upd=  await this.provinceModel.findByIdAndUpdate(
                { _id: id, ...this.whereQuery} ,
                province,
                {
                  new: true,
                },
              );            
            traza.trazaDTO.before=JSON.stringify(dco_find);
            traza.trazaDTO.update=JSON.stringify(upd);            
            traza.save() ; 
        } catch (error) {
          traza.trazaDTO.error= error ;
          traza.save();
          throw error;
        }  
    }      
    return this.toEntity (upd)    
  }

   async remove(id: string, traza:TrazasService): Promise<Province> {
    // validateId(id, MODULE);
    let dco_find=  await this.provinceModel.findById({ _id: id, ...this.whereQuery });

    let ee=null;
    let upd=null;
    if (!dco_find) {
      ee='No existe documento id'+id;
      
      traza.trazaDTO.error= ee ;
      traza.save();
      throw ee;
    } else { 

/*        let mnc=await this.muncipalityModel.findOne({province:id}) ;
      console.log(mnc);
      
*/ 
      traza.trazaDTO.filter= JSON.stringify({ isDeleted: true });    
      try {
              upd=  await this.provinceModel.findByIdAndUpdate(
                { _id: id, ...this.whereQuery} ,
                { isDeleted: true },
                {
                  new: true,
                },
              );            
            traza.trazaDTO.before=JSON.stringify(dco_find);
            traza.trazaDTO.update=JSON.stringify(upd);            
            traza.save() ; 
        } catch (error) {
          traza.trazaDTO.error= error ;
          traza.save();
          throw error;
        } 
    }      
    return this.toEntity (upd )   
  }

  async search(query) : Promise<Province[]> {

    let buscar= query.exactName? { name:query.exactName, isDeleted: query.isDeleted} :  { name: '/'.concat(query.exactName,'/i') };
    console.log(buscar);
    
     let result=null;
    const provinceCollection =await Promise.all([this.provinceModel.find(buscar).exec()])[0] ;
     provinceCollection.map((item) =>
      result.add( this.toEntity(item))
    );
    return result;
  }

  toEntity(prov:ProvinceModel): Province {
    return {
      id: prov._id.toString(),
      name: prov.name,
      isDeleted:prov.isDeleted,
      createdAt: prov.createdAt,
      updatedAt: prov.updatedAt,
      is_Deleted:prov.is_Deleted,
    };
  }
}
