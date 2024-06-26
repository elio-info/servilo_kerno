import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DataList } from 'src/modules/common/data-list';
import { ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';
import { ConsejoPopular_Municipality_Repository as ConsejoPopular_MunicipalityRepository } from '../domain/repository/consejopopular_municipality.repository';
import { ConsejoPopular_Municipality_Document, ConsejoPopular_Municipality_Model } from '../domain/schemas/consejo_popular.schema';
import { ConsejoPopular_Municipality_Entity } from '../domain/schemas/consejo_popular.entity';
import { Create_ConsejoPopular_Municipality_Dto } from '../domain/dto/create-consejopopular_municipality.dto';
import { Update_ConsejoPopular_Municipality_Dto } from '../domain/dto/update-consejopopular_municipality.dto';
import { validateId } from 'src/modules/common/helpers/id-validator';

const MODULE = 'Municipality';
const IS_NOT_DELETED = { isDeleted: false };

@Injectable()
export class Mongoose_ConsejoPopular_Municipality_Repository implements ConsejoPopular_MunicipalityRepository {
  constructor(
    @InjectModel(ConsejoPopular_Municipality_Model.name)
    private consejopopular_municipality_Model: Model<ConsejoPopular_Municipality_Model>,
  ) {}

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<DataList<ConsejoPopular_Municipality_Entity>> {
    const skipCount = (page - 1) * pageSize;

    const [consejopopular_municipalities, count] = await Promise.all([
      this.consejopopular_municipality_Model
        .find(IS_NOT_DELETED)
        .skip(skipCount)
        .limit(pageSize)
        .populate('province')
        .populate('municipality')
        .exec(),
      this.consejopopular_municipality_Model.countDocuments(IS_NOT_DELETED).exec(),
    ]);

    const consejopopular_municipalityCollection = consejopopular_municipalities.map((municipality) =>
      this.toEntity(municipality),
      //this.toEntity(prov)
    );

    const dataList: DataList<ConsejoPopular_Municipality_Entity> = {
      data: consejopopular_municipalityCollection,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(cp_municipality: Create_ConsejoPopular_Municipality_Dto): Promise<void> {
    validateId(cp_municipality.province, 'province');
    validateId(cp_municipality.municipality, 'municipality');
    await new this.consejopopular_municipality_Model(cp_municipality).save();
  }

  async findOne(id: string): Promise<ConsejoPopular_Municipality_Entity> {
    validateId(id, MODULE);

    const consejopopular_municipality = await this.consejopopular_municipality_Model
      .findById(id)
      .where(IS_NOT_DELETED)
      .populate('province')
      .populate('municipality')

    if (!consejopopular_municipality) {
      throw new ObjectNotFound(MODULE);
    }

    return this.toEntity(consejopopular_municipality);
  }

  async update(
    id: string,
    cp_municipality: Update_ConsejoPopular_Municipality_Dto,
  ): Promise<ConsejoPopular_Municipality_Entity> {
    validateId(id), MODULE;
    if (cp_municipality.province) {
      validateId(cp_municipality.province, 'province');
    }
    if (cp_municipality.municipality) {
          validateId(cp_municipality.municipality, 'province');
        }
    const updated = await this.consejopopular_municipality_Model.findOneAndUpdate(
      { _id: id, ...IS_NOT_DELETED },
      cp_municipality,
      { new: true,},
    );

    if (!updated) {
      throw new ObjectNotFound(MODULE);
    }

    return this.toEntity(updated);
  }

  async remove(id: string): Promise<void> {
    validateId(id, MODULE);

    const document = await this.consejopopular_municipality_Model.findOneAndUpdate(
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
    const consejopopular_municipalities = await this.consejopopular_municipality_Model
      .find(query)
      .populate('municipality');
    const co_municipalityCollection = consejopopular_municipalities.map((co_municipality) =>
      this.toEntity(co_municipality),
    );
    return co_municipalityCollection;
  }

  private toEntity(co_municipality: ConsejoPopular_Municipality_Document): ConsejoPopular_Municipality_Entity {
    return {
      id: co_municipality._id.toString(),
      name: co_municipality.name,
      municipality:co_municipality.municipality ,     
      province:co_municipality.province,
      createdAt:co_municipality.createdAt,
      updatedAt:co_municipality.updatedAt,
      isDeleted:co_municipality.isDeleted
    };
  }
}
