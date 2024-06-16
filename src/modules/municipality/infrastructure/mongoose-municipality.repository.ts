import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DataList } from 'src/modules/common/data-list';
import { ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';
import { MunicipalityRepository } from '../domain/repository/municipality.repository';
import { MunicipalityDocument, MunicipalityModel } from './municipality.schema';
import { Municipality } from '../domain/entities/municipality.entity';
import { CreateMunicipalityDto } from '../domain/dto/create-municipality.dto';
import { UpdateMunicipalityDto } from '../domain/dto/update-municipality.dto';
import { validateId } from 'src/modules/common/helpers/id-validator';

const MODULE = 'Municipality';
const IS_NOT_DELETED = { isDeleted: false };

@Injectable()
export class MongooseMunicipalityRepository implements MunicipalityRepository {
  constructor(
    @InjectModel(MunicipalityModel.name)
    private municipalityModel: Model<MunicipalityModel>,
  ) {}

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<DataList<Municipality>> {
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

  async create(municipality: CreateMunicipalityDto): Promise<void> {
    validateId(municipality.province, 'province');
    await new this.municipalityModel(municipality).save();
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

  async update(
    id: string,
    municipality: UpdateMunicipalityDto,
  ): Promise<Municipality> {
    validateId(id), MODULE;
    if (municipality.province) {
      validateId(municipality.province, 'province');
    }

    const updated = await this.municipalityModel.findOneAndUpdate(
      { _id: id, ...IS_NOT_DELETED },
      municipality,
      { new: true, populate: 'province' },
    );

    if (!updated) {
      throw new ObjectNotFound(MODULE);
    }

    return this.toEntity(updated);
  }

  async remove(id: string): Promise<void> {
    validateId(id, MODULE);

    const document = await this.municipalityModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        isDeleted: true,
      },
    );

    if (!document) {
      throw new ObjectNotFound();
    }
  }

  async search(query) {
    const municipalities = await this.municipalityModel
      .find(query)
      .populate('province');
    const municipalityCollection = municipalities.map((municipality) =>
      this.toEntity(municipality),
    );
    return municipalityCollection;
  }

  private toEntity(municipality: MunicipalityDocument): Municipality {
    return {
      id: municipality._id.toString(),
      name: municipality.name,
      updatedAt: municipality.updatedAt,
      createdAt: municipality.createdAt,
      province: {
        id: municipality.province._id.toString(),
        name: municipality.province.name,
        isDeleted:municipality.province.isDeleted,
        updatedAt: municipality.province.updatedAt,
        createdAt: municipality.province.createdAt,
      },
    };
  }
}
