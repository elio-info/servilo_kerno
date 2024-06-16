import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { CategorieRepository } from '../domain/repository/categorie.repository';
import { DataList } from 'src/modules/common/data-list';
import { CreateCategorieDto } from '../domain/dto/create-categorie.dto';
import { UpdateCategorieDto } from '../domain/dto/update-categorie.dto';
import { Categorie } from '../domain/entities/categorie.entity';
import { CategorieDocument, CategorieModel } from './categorie.schema';
import { WrongIdFormat } from '../../common/errors/wrong-id-format.error';
import { ObjectNotFound } from '../../common/errors/object-not-found.error';
import { validateId } from '../../common/helpers/id-validator';
import { DuplicatedValueError } from '../../common/errors/duplicated-value.error';

@Injectable()
export class MongooseCategorieRepository implements CategorieRepository {
  private WHERE_QUERY = { isDeleted: false };
  private MODULE = 'Categorie';
  constructor(
    @InjectModel(CategorieModel.name)
    private categorieModel: Model<CategorieModel>,
  ) {}

  async findAll(page: number, pageSize: number): Promise<DataList<Categorie>> {
    const skipCount = (page - 1) * pageSize;

    const [categories, count] = await Promise.all([
      this.categorieModel
        .find(this.WHERE_QUERY)
        .skip(skipCount)
        .limit(pageSize)
        .exec(),
      this.categorieModel.countDocuments(this.WHERE_QUERY).exec(),
    ]);

    const categorieCollection: Categorie[] = categories.map((categorie) =>
      this.toEntity(categorie),
    );

    const dataList: DataList<Categorie> = {
      data: categorieCollection,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(categorie: CreateCategorieDto): Promise<void> {
    const exist = await this.categorieModel.findOne({
      name: categorie.name,
      isDeleted: true,
    });
    if (!exist) {
      try {
        await new this.categorieModel(categorie).save();
      } catch (e) {
        throw new DuplicatedValueError(this.MODULE);
      }
    } else {
      await this.categorieModel.findByIdAndUpdate(exist._id, {
        isDeleted: false,
      });
    }
  }

  async findOne(id: string): Promise<Categorie> {
    validateId(id, this.MODULE);

    const categorie = await this.categorieModel
      .findById(id)
      .where(this.WHERE_QUERY);

    if (!categorie) {
      throw new ObjectNotFound(this.MODULE);
    }

    return this.toEntity(categorie);
  }

  async update(id: string, categorie: UpdateCategorieDto): Promise<Categorie> {
    validateId(id, this.MODULE);
    try {
      const document = await this.categorieModel.findOneAndUpdate(
        { _id: id, ...this.WHERE_QUERY },
        categorie,
        {
          new: true,
        },
      );
      return this.toEntity(document);
    } catch (e) {
      throw new DuplicatedValueError(this.MODULE);
    }
  }

  async remove(id: string): Promise<void> {
    validateId(id, this.MODULE);
    const document = await this.categorieModel
      .findById(id)
      .where(this.WHERE_QUERY);
    if (!document) {
      throw new ObjectNotFound();
    }
    await document.updateOne({ isDeleted: true });
  }
  async search(query) {
    const categories = await this.categorieModel.find(query);
    const categriesCollection = categories.map((categorie) =>
      this.toEntity(categorie),
    );
    return categriesCollection;
  }

  private toEntity(categorie: CategorieDocument): Categorie {
    return {
      id: categorie._id.toString(),
      name: categorie.name,
      updatedAt: categorie.updatedAt,
      createdAt: categorie.createdAt,
    };
  }
}
