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

  async create(province: CreateProvinceDto): Promise<void> {
    try {
      console.log(province)
      await new this.provinceModel(province).save();
    } catch (e) {
      throw new DuplicatedValueError(MODULE);
    }
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

  async remove(id: string): Promise<void> {
    try {
      const document = await this.provinceModel
        .findById(id)
        .where(this.whereQuery);
      if (!document) {
        throw new ObjectNotFound();
      }
      await document.updateOne({ isDeleted: true });
    } catch (e) {
      if (e instanceof Error.CastError) {
        throw new WrongIdFormat(MODULE);
      }
      throw e;
    }
  }
  async search(query) {
    const provinces = await this.provinceModel.find(query);
    const provinceCollection = provinces.map((municipality) =>
      this.toEntity(municipality),
    );
    return provinceCollection;
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
