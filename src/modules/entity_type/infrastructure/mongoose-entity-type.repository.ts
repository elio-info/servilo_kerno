import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { EntityTypeRepository } from '../domain/repository/entity-type.repository';
import { DataList } from 'src/modules/common/data-list';
import { CreateEntityTypeDto } from '../domain/dto/create-entity-type.dto';
import { UpdateEntityTypeDto } from '../domain/dto/update-entity-type.dto';
import { EntityType } from '../domain/entities/entity-type.entity';
import { EntityTypeDocument, EntityTypeModel } from './entity-type.schema';
import { WrongIdFormat } from '../../common/errors/wrong-id-format.error';
import { ObjectNotFound } from '../../common/errors/object-not-found.error';
import { validateId } from '../../common/helpers/id-validator';
import { DuplicatedValueError } from '../../common/errors/duplicated-value.error';

@Injectable()
export class MongooseEntityTypeRepository implements EntityTypeRepository {
  private WHERE_QUERY = { isDeleted: false };
  private MODULE = 'Entity Type';
  constructor(
    @InjectModel(EntityTypeModel.name)
    private entTypeModel: Model<EntityTypeModel>,
  ) {}

  async findAll(page: number, pageSize: number): Promise<DataList<EntityType>> {
    const skipCount = (page - 1) * pageSize;

    const [entTypes, count] = await Promise.all([
      this.entTypeModel
        .find(this.WHERE_QUERY)
        .skip(skipCount)
        .limit(pageSize)
        .exec(),
      this.entTypeModel.countDocuments(this.WHERE_QUERY).exec(),
    ]);

    const entTypeCollection: EntityType[] = entTypes.map((entity) =>
      this.toEntity(entity),
    );

    const dataList: DataList<EntityType> = {
      data: entTypeCollection,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(entType: CreateEntityTypeDto): Promise<void> {
    try {
      await new this.entTypeModel(entType).save();
    } catch (e) {
      if (e instanceof Error.CastError) {
        throw new WrongIdFormat(this.MODULE);
      }
      throw new DuplicatedValueError(this.MODULE);
    }
  }

  async findOne(id: string): Promise<EntityType> {
    validateId(id, this.MODULE);

    const entType = await this.entTypeModel
      .findById(id)
      .where(this.WHERE_QUERY);

    if (!entType) {
      throw new ObjectNotFound(this.MODULE);
    }

    return this.toEntity(entType);
  }

  async update(id: string, entType: UpdateEntityTypeDto): Promise<EntityType> {
    validateId(id, this.MODULE);

    const document = await this.entTypeModel.findOneAndUpdate(
      { _id: id, ...this.WHERE_QUERY },
      entType,
      {
        new: true,
      },
    );
    return this.toEntity(document);
  }

  async remove(id: string): Promise<void> {
    validateId(id, this.MODULE);
    const document = await this.entTypeModel
      .findById(id)
      .where(this.WHERE_QUERY);
    if (!document) {
      throw new ObjectNotFound();
    }
    await document.updateOne({ isDeleted: true });
  }
  async search(query) {
    const ents = await this.entTypeModel.find(query);
    const entCollection = ents.map((entType) => this.toEntity(entType));
    return entCollection;
  }

  private toEntity(entType: EntityTypeDocument): EntityType {
    return {
      id: entType._id.toString(),
      name: entType.name,
      hierarchy: entType.hierarchy,
      updatedAt: entType.updatedAt,
      createdAt: entType.createdAt,
    };
  }
}
