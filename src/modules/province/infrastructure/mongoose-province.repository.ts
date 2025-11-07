import { Injectable, Module } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { ProvinceRepository } from '../domain/repository/province.repository';
import { DataList } from 'src/modules/common/data-list';
import { CreateProvinceDto } from '../domain/dto/create-province.dto';
import { UpdateProvinceDto } from '../domain/dto/update-province.dto';
import { Province } from '../domain/entities/province.entity';
import { ProvinceModel } from './province.schema';
import { WrongIdFormat } from 'src/modules/common/errors/wrong-id-format.error';
import { ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';
import { validateId } from 'src/modules/common/helpers/id-validator';
import { DuplicatedValueError } from 'src/modules/common/errors/duplicated-value.error';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

// const SELECT_QUERY: string = 'isDeleted name createdAt updatedAt';
const MODULE = 'Province';

@Injectable()
export class MongooseProvinceRepository implements ProvinceRepository {
  private whereQuery = { isDeleted: false };

  constructor(
    @InjectModel(ProvinceModel.name)
    private provinceModel: Model<ProvinceModel>,
  ) {}

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
      // console.log(province)

      traza.traza_Consulta= 'create '+province.name

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

                  traza.traza_EstadoConsulta='DuplicatedValueError '+ data.name + ' -> ' + MODULE
                  traza.traza_logg();
                  throw new DuplicatedValueError( data.name + ' -> ' + MODULE);
                }
              })
      // console.log(us);
             traza.traza_EstadoConsulta='Ok' ;
             traza.traza_logg();
      return await new this.provinceModel(province).save();
     
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
      isDeleted:province.isDeleted,
      updatedAt: province.updatedAt,
      createdAt: province.createdAt,
    };
  }

  async update(id: string, province: UpdateProvinceDto): Promise<Province> {
    validateId(id, MODULE);

    const document = await this.provinceModel.findOneAndUpdate(
      { _id: id, ...this.whereQuery },
      province,
      {
        new: true,
      },
    );
    return {
      id: document._id.toString(),
      name: document.name,
      isDeleted:document.isDeleted,
      updatedAt: document.updatedAt,
      createdAt: document.createdAt,
    };
  }

  async remove(id: string): Promise<Province> {
    try {
      const document = await this.provinceModel
        .findById(id)
        .where(this.whereQuery);
      if (!document) {
        throw new ObjectNotFound();
      }
    return  await document.updateOne({ isDeleted: true });
    } catch (e) {
      if (e instanceof Error.CastError) {
        throw new WrongIdFormat(MODULE);
      }
      else
      throw e;
    }
  }
  async search(query) : Promise<Province> {

    let buscar= query.exactName? { name:query.exactName, isDeleted: query.isDeleted} :  { name: '/'.concat(query.exactName,'/i') };
    console.log(buscar);
    
    return await Promise.all([this.provinceModel.find(buscar).exec()])[0] ;
    // const provinceCollection = provinces.map((municipality) =>
    //   this.toEntity(municipality),
    // );
    //return provinces;
  }

  toEntity(prov): Province {
    return {
      id: prov._id.toString(),
      name: prov.name,
      isDeleted:prov.isDeleted,
      createdAt: prov.createdAt,
      updatedAt: prov.updatedAt,
    };
  }
}
