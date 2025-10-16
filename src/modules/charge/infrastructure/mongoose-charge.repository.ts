import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { ChargeRepository } from '../domain/repository/charge.repository';
import { DataList } from 'src/modules/common/data-list';
import { CreateChargeDto } from '../domain/dto/create-charge.dto';
import { UpdateChargeDto } from '../domain/dto/update-charge.dto';
import { Charge } from '../domain/entities/charge.entity';
import { ChargeDocument, ChargeModel } from './charge.schema';
import { WrongIdFormat } from '../../common/errors/wrong-id-format.error';
import { ObjectNotFound } from '../../common/errors/object-not-found.error';
import { validateId } from '../../common/helpers/id-validator';
import { DuplicatedValueError } from '../../common/errors/duplicated-value.error';

@Injectable()
export class MongooseChargeRepository implements ChargeRepository {
  private WHERE_QUERY = { isDeleted: false };
  private MODULE = 'Charge';
  constructor(
    @InjectModel(ChargeModel.name)
    private chargeModel: Model<ChargeModel>,
  ) {}

  async findAll(page: number, pageSize: number): Promise<DataList<Charge>> {
    const skipCount = (page - 1) * pageSize;

    const [charges, count] = await Promise.all([
      this.chargeModel
        .find(this.WHERE_QUERY)
        .skip(skipCount)
        .limit(pageSize)
        .exec(),
      this.chargeModel.countDocuments(this.WHERE_QUERY).exec(),
    ]);

    const chargeCollection: Charge[] = charges.map((charge) =>
      this.toEntity(charge),
    );

    const dataList: DataList<Charge> = {
      data: chargeCollection,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(charge: CreateChargeDto): Promise<void> {
    try {
      await new this.chargeModel(charge).save();
    } catch (e) {
      if (e instanceof Error.CastError) {
        throw new WrongIdFormat(this.MODULE);
      }
      throw new DuplicatedValueError(this.MODULE);
    }
  }

  async findOne(id: string): Promise<Charge> {
    validateId(id, this.MODULE);

    const charge = await this.chargeModel.findById(id).where(this.WHERE_QUERY);

    if (!charge) {
      throw new ObjectNotFound(this.MODULE);
    }

    return this.toEntity(charge);
  }

  async update(id: string, charge: UpdateChargeDto): Promise<Charge> {
    validateId(id, this.MODULE);

    const document = await this.chargeModel.findOneAndUpdate(
      { _id: id, ...this.WHERE_QUERY },
      charge,
      {
        new: true,
      },
    );
    return this.toEntity(document);
  }

  async remove(id: string): Promise<void> {
    validateId(id, this.MODULE);
    const document = await this.chargeModel
      .findById(id)
      .where(this.WHERE_QUERY);
    if (!document) {
      throw new ObjectNotFound();
    }
    await document.updateOne({ isDeleted: true });
  }
  async search(query) {
    const charges = await this.chargeModel.find(query);
    const chargeCollection = charges.map((charge) => this.toEntity(charge));
    return chargeCollection;
  }

  private toEntity(charge: ChargeDocument): Charge {
    return {
      id: charge._id.toString(),
      name: charge.name,
      updatedAt: charge.updatedAt,
      createdAt: charge.createdAt,
    };
  }
}
