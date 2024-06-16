import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DataList } from 'src/modules/common/data-list';
import { ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';
import { Entity } from '../domain/entities/entity.entity';
import { EntityDocument, EntityModel } from './entity.schema';
import { CreateEntityDto } from '../domain/dto/create-entity.dto';
import { UpdateEntityDto } from '../domain/dto/update-entity.dto';
import { DuplicatedValueError } from 'src/modules/common/errors/duplicated-value.error';
import {
  extractEntityType,
  extractMunicipality,
  extractPlace,
} from '../../common/extractors';
import { validateId } from 'src/modules/common/helpers/id-validator';
import { EntityRepository } from '../domain/repository/entity.repository';

const POPULATE_PATH = {
  entityType: { path: 'entityType' },
  municipality: { path: 'municipality', populate: { path: 'province' } },
  place: {
    path: 'place',
    populate: { path: 'municipality', populate: { path: 'province' } },
  },
};
const MODULE = 'Entity';
const IS_NOT_DELETED = { isDeleted: false };

@Injectable()
export class MongooseEntityRepository implements EntityRepository {
  constructor(
    @InjectModel(EntityModel.name)
    private entityModel: Model<EntityModel>,
  ) {}

  async findAll(page: number, pageSize: number): Promise<DataList<Entity>> {
    const skipCount = (page - 1) * pageSize;

    const [entities, count] = await Promise.all([
      this.entityModel
        .find(IS_NOT_DELETED)
        .skip(skipCount)
        .limit(pageSize)
        .populate(POPULATE_PATH.municipality)
        .populate(POPULATE_PATH.entityType)
        .populate('parentId')
        .populate(POPULATE_PATH.place)
        .exec(),
      this.entityModel.countDocuments(IS_NOT_DELETED).exec(),
    ]);
    const entityCollection = entities.map((entity) => this.toEntity(entity));

    const dataList: DataList<Entity> = {
      data: entityCollection,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(entity: CreateEntityDto): Promise<void> {
    try {
      await new this.entityModel(entity).save();
    } catch (e) {
      throw new DuplicatedValueError(e.message);
    }
  }

  async findOne(id: string): Promise<Entity> {
    validateId(id, MODULE);

    const entity = await this.entityModel
      .findById(id)
      .where(IS_NOT_DELETED)
      .populate(POPULATE_PATH.municipality)
      .populate(POPULATE_PATH.entityType)
      .populate('parentId')
      .populate(POPULATE_PATH.place);
    if (!entity) {
      throw new ObjectNotFound(MODULE);
    }

    return this.toEntity(entity);
  }

  async update(id: string, entity: UpdateEntityDto): Promise<Entity> {
    validateId(id, MODULE);

    const document = await this.entityModel
      .findOneAndUpdate({ _id: id, ...IS_NOT_DELETED }, entity, {
        new: true,
        populate: { path: 'municipality', populate: { path: 'province' } },
      })
      .populate(POPULATE_PATH.municipality)
      .populate(POPULATE_PATH.entityType)
      .populate('parentId')
      .populate(POPULATE_PATH.place);

    if (!document) {
      throw new ObjectNotFound(MODULE);
    }

    return this.toEntity(document);
  }

  async remove(id: string): Promise<void> {
    validateId(id, MODULE);

    const document = await this.entityModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        isDeleted: true,
      },
    );

    if (!document) {
      throw new ObjectNotFound(MODULE);
    }
  }
  async search(query) {
    const ents = await this.entityModel
      .find(query)
      .populate(POPULATE_PATH.municipality)
      .populate(POPULATE_PATH.entityType)
      .populate('parentId')
      .populate(POPULATE_PATH.place);
    const entCollection = ents.map((ent) => this.toEntity(ent));
    return entCollection;
  }

  private toEntity(entity: EntityDocument): Entity {
    return {
      id: entity._id.toString(),
      entityType: extractEntityType(entity.entityType),
      parentId: entity.parentId ? entity.parentId._id.toString() : null,
      name: entity.name,
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
