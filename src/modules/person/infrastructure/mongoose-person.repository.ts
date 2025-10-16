import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DataList } from 'src/modules/common/data-list';
import { ObjectNotFound } from 'src/modules/common/errors/object-not-found.error';
import { PersonRepository } from '../domain/repository/person.repository';
import { Person } from '../domain/entities/person.entity';
import { PersonDocument, PersonModel } from './person.schema';
import { CreatePersonDto } from '../domain/dto/create-person.dto';
import { UpdatePersonDto } from '../domain/dto/update-person.dto';
import { InactiveUser } from '../../domain/errors/user-no-active.error';
import { DuplicatedValueError } from 'src/modules/common/errors/duplicated-value.error';
import { extractEntity, extractMunicipality } from '../../common/extractors';
import { PersonAuth } from 'src/modules/auth/domain/person-auth.entity';
import { validateId } from 'src/modules/common/helpers/id-validator';
import { UserNotFound } from 'src/modules/domain/errors/user-not-found.error';
import { Entity } from 'src/modules/entity/domain/entities/entity.entity';

const POPULATE_PATH = { path: 'municipality', populate: { path: 'province' } };
const ENTITY_PATH = {
  entityType: { path: 'entityType' },
  municipality: { path: 'municipality', populate: { path: 'province' } },
  place: {
    path: 'place',
    populate: { path: 'municipality', populate: { path: 'province' } },
  },
};
const MODULE = 'Person';
const IS_NOT_DELETED = { isDeleted: false };

@Injectable()
export class MongoosePersonRepository implements PersonRepository {
  constructor(
    @InjectModel(PersonModel.name)
    private personModel: Model<PersonModel>,
  ) {}

  async findAll(page: number, pageSize: number): Promise<DataList<Person>> {
    const skipCount = (page - 1) * pageSize;

    const [persons, count] = await Promise.all([
      this.personModel
        .find(IS_NOT_DELETED)
        .skip(skipCount)
        .limit(pageSize)
        .populate(POPULATE_PATH)
        .populate({ path: 'entity', populate: ENTITY_PATH.entityType })
        .populate({ path: 'entity', populate: ENTITY_PATH.municipality })
        .populate({ path: 'entity', populate: ENTITY_PATH.place })
        .exec(),
      this.personModel.countDocuments(IS_NOT_DELETED).exec(),
    ]);
    const personCollection = persons.map((person) => this.toEntity(person));

    const dataList: DataList<Person> = {
      data: personCollection,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(person: CreatePersonDto): Promise<void> {
    validateId(person.municipality, 'municipality');
    try {
      await new this.personModel(person).save();
    } catch (e) {
      throw new DuplicatedValueError(e.message);
    }
  }

  async findOne(id: string): Promise<Person> {
    validateId(id, MODULE);

    const person = await this.personModel
      .findById(id)
      .where(IS_NOT_DELETED)
      .populate(POPULATE_PATH)
      .populate({ path: 'entity', populate: ENTITY_PATH.entityType })
      .populate({ path: 'entity', populate: ENTITY_PATH.municipality })
      .populate({ path: 'entity', populate: ENTITY_PATH.place });
    if (!person) {
      throw new ObjectNotFound(MODULE);
    }
    return this.toEntity(person);
  }

  async update(id: string, person: UpdatePersonDto): Promise<Person> {
    validateId(id, MODULE);

    if (person.municipality) {
      validateId(person.municipality, 'municipality');
    }
    try {
      const document = await this.personModel
        .findOneAndUpdate({ _id: id, ...IS_NOT_DELETED }, person, {
          new: true,
          populate: { path: 'municipality', populate: { path: 'province' } },
        })
        .populate({ path: 'entity', populate: ENTITY_PATH.entityType })
        .populate({ path: 'entity', populate: ENTITY_PATH.municipality })
        .populate({ path: 'entity', populate: ENTITY_PATH.place });

      if (!document) {
        throw new ObjectNotFound(MODULE);
      }

      return this.toEntity(document);
    } catch (e) {
      throw new DuplicatedValueError(e.message);
    }
  }

  async remove(id: string): Promise<void> {
    validateId(id, MODULE);

    const document = await this.personModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        isDeleted: true,
      },
    );

    if (!document) {
      throw new ObjectNotFound(MODULE);
    }
  }

  async byUserName(username: string): Promise<PersonAuth> {
    const document = await this.personModel
      .findOne({ username, ...IS_NOT_DELETED })
      .select('_id username hashPassword salt isActive')
      .exec();

    if (!document) {
      throw new UserNotFound();
    }
    if (!document.isActive) {
      throw new InactiveUser();
    }

    return {
      id: document._id.toString(),
      username: document.username,
      hashPassword: document.hashPassword,
    };
  }

  async search(query) {
    const persons = await this.personModel
      .find(query)
      .populate({ path: 'municipality', populate: { path: 'province' } })
      .populate({ path: 'entity', populate: ENTITY_PATH.entityType })
      .populate({ path: 'entity', populate: ENTITY_PATH.municipality })
      .populate({ path: 'entity', populate: ENTITY_PATH.place });
    const personCollection = persons.map((person) => this.toEntity(person));
    return personCollection;
  }

  private toEntity(person: PersonDocument): Person {
    return {
      id: person._id.toString(),
      name: person.name,
      lastName1: person.lastName1,
      lastName2: person.lastName2,
      ci: person.ci,
      email: person.email,
      skinColor: person.skinColor,
      phone: person.phone,
      isActive: person.isActive,
      username: person.username,
      passwordExpirationDate: person.passwordExpirationDate,
      address: person.address,
      image: person.image,
      gender: person.gender,
      updatedAt: person.updatedAt,
      createdAt: person.createdAt,
      role: person.role,
      entity: extractEntity(person.entity),
      municipality: extractMunicipality(person.municipality),
    };
  }
}
