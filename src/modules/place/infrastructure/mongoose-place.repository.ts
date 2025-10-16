import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { DataList } from 'src/modules/common/data-list';
import { WrongIdFormat } from 'src/modules/common/errors/wrong-id-format.error';
import { ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';
import { PlaceRepository } from '../domain/repository/place.repository';
import { PlaceDocument, PlaceModel } from './places.schema';
import { CreatePlaceDto } from '../domain/dto/create-place.dto';
import { UpdatePlaceDto } from '../domain/dto/update-place.dto';
import { DuplicatedValueError } from 'src/modules/common/errors/duplicated-value.error';
import { Place } from '../domain/entities/place.entity';
import { extractMunicipality } from '../../common/extractors';
import { validateId } from 'src/modules/common/helpers/id-validator';

const MODULE = 'Place';
const IS_NOT_DELETED = { isDeleted: false };
const POPULATE_QUERY = { path: 'municipality', populate: { path: 'province' } };

@Injectable()
export class MongoosePlaceRepository implements PlaceRepository {
  constructor(
    @InjectModel(PlaceModel.name)
    private placeModel: Model<PlaceModel>,
  ) {}

  async findAll(page: number, pageSize: number): Promise<DataList<Place>> {
    const skipCount = (page - 1) * pageSize;

    const [places, count] = await Promise.all([
      this.placeModel
        .find(IS_NOT_DELETED)
        .skip(skipCount)
        .limit(pageSize)
        .populate(POPULATE_QUERY)
        .exec(),
      this.placeModel.countDocuments(IS_NOT_DELETED).exec(),
    ]);

    const placeCollection = places.map((place) => this.toEntity(place));

    const dataList: DataList<Place> = {
      data: placeCollection,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(place: CreatePlaceDto): Promise<void> {
    validateId(place.municipality, 'municipality');
    try {
      await new this.placeModel(place).save();
    } catch (e) {
      throw new DuplicatedValueError(e.message);
    }
  }

  async findOne(id: string): Promise<Place> {
    validateId(id, MODULE);

    const place = await this.placeModel
      .findById(id)
      .where(IS_NOT_DELETED)
      .populate(POPULATE_QUERY);
    if (!place) {
      throw new ObjectNotFound(MODULE);
    }

    return this.toEntity(place);
  }

  async update(id: string, place: UpdatePlaceDto): Promise<Place> {
    validateId(id, MODULE);

    if (place.municipality) {
      validateId(place.municipality, 'municipality');
    }

    const document = await this.placeModel.findOneAndUpdate(
      { _id: id, ...IS_NOT_DELETED },
      place,
      {
        new: true,
        populate: POPULATE_QUERY,
      },
    );

    if (!document) {
      throw new ObjectNotFound(MODULE);
    }

    return this.toEntity(document);
  }

  async remove(id: string): Promise<void> {
    validateId(id, MODULE);

    const document = await this.placeModel.findOneAndUpdate(
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
    const place = await this.placeModel
      .find(query)
      .populate({ path: 'municipality', populate: { path: 'province' } });
    const placeCollection = place.map((municipality) =>
      this.toEntity(municipality),
    );
    return placeCollection;
  }

  private toEntity(place: PlaceDocument): Place {
    return {
      id: place._id.toString(),
      name: place.name,
      updatedAt: place.updatedAt,
      createdAt: place.createdAt,
      municipality: extractMunicipality(place.municipality),
    };
  }
}
