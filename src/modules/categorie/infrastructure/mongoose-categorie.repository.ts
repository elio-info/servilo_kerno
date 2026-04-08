import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { CategorieRepository } from '../domain/repository/categorie.repository';
import { DataList } from 'src/modules/common/data-list';
import { CreateCategorieDto } from '../domain/dto/create-categorie.dto';
import { UpdateCategorieDto } from '../domain/dto/update-categorie.dto';
import { Categorie_Entity } from '../domain/entities/categorie.entity';
import { CategorieDocument, CategorieModel } from './categorie.schema';
import { WrongIdFormat } from '../../common/errors/wrong-id-format.error';
import { ObjectNotFound } from '../../common/errors/object-not-found.error';
import { validateId } from '../../common/helpers/id-validator';
import { DuplicatedValueError } from '../../common/errors/duplicated-value.error';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

@Injectable()
export class MongooseCategorieRepository implements CategorieRepository {
  private WHERE_QUERY = { isDeleted: false };
  private MODULE = 'Categorie';
  constructor(
    @InjectModel(CategorieModel.name)
    private categorieModel: Model<CategorieModel>,
  ) {}

  async findAll(page: number, pageSize: number): Promise<DataList<Categorie_Entity>> {
    const skipCount = (page - 1) * pageSize;

    const [categories, count] = await Promise.all([
      this.categorieModel
        .find(this.WHERE_QUERY)
        .skip(skipCount)
        .limit(pageSize)
        .exec(),
      this.categorieModel.countDocuments(this.WHERE_QUERY).exec(),
    ]);

    const categorieCollection: Categorie_Entity[] = categories.map((categorie) =>
      this.toEntity(categorie),
    );

    const dataList: DataList<Categorie_Entity> = {
      data: categorieCollection,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    };
    return dataList;
  }

  async create(categorie: CreateCategorieDto, trz:TrazasService): Promise<Categorie_Entity|string> {
    const exist = await this.categorieModel.findOne({
      name: categorie.name,
     // isDeleted: true,
    });
    if (!exist) {
      try {
      let itm=  await new this.categorieModel(categorie).save();
      trz.trazaDTO.update=itm;
      trz.save();
      return this.toEntity(itm);
      } catch (e) {
        trz.trazaDTO.error=e;
        trz.save();
        //throw new DuplicatedValueError(this.MODULE);
        return trz.terror();
      }
    } else {
      await this.categorieModel.findByIdAndUpdate(exist._id, {
        isDeleted: false,
      });
    }
  }

  async findOne(id: string): Promise<Categorie_Entity |string> {
    validateId(id, this.MODULE);

    const categorie = await this.categorieModel
      .findById(id)
      .where(this.WHERE_QUERY);

    if (!categorie) {
      return (new ObjectNotFound(this.MODULE)).message;
    }

    return this.toEntity(categorie);
  }

  async update(categorie: UpdateCategorieDto): Promise<Categorie_Entity|string> {
    
    try {
      const document = await this.categorieModel.findOneAndUpdate(
        { _id: categorie.id, ...this.WHERE_QUERY },
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

  async remove(id: string, trz:TrazasService): Promise<Categorie_Entity|string> {
    // validateId(id, this.MODULE);
    const document = await this.categorieModel
      .findById(id)
      .where(this.WHERE_QUERY);

    if (!document) {
      trz.trazaDTO.error = new ObjectNotFound();
      trz.save();
      return trz.terror();
    }
    let rm=await document.updateOne({ isDeleted: true });
    trz.trazaDTO.update=rm;
    trz.save();
    return this.toEntity(document);
  }
  async search(query) {
    const categories = await this.categorieModel.find(query);
    const categriesCollection = categories.map((categorie) =>
      this.toEntity(categorie),
    );
    return categriesCollection;
  }

  private toEntity(categorie: CategorieModel): Categorie_Entity {
    return {
      id: categorie._id.toString(),
      name: categorie.name,
      nameTitle: categorie.nameTitle,
      link: categorie.link,
      access_point:categorie.access_point,
      isDeleted:categorie.isDeleted,
      updatedAt: categorie.updatedAt,
      createdAt: categorie.createdAt,
    };
  }
}
