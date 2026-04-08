import { Inject, Injectable } from '@nestjs/common';
import { CreateCategorieDto } from '../domain/dto/create-categorie.dto';
import { UpdateCategorieDto } from '../domain/dto/update-categorie.dto';
import { CategorieRepository } from '../domain/repository/categorie.repository';
import { MongooseCategorieRepository } from '../infrastructure/mongoose-categorie.repository';
import { InvalidPaginationError } from '../../common/errors/invalid-pagination.error';
import { DataList } from '../../common/data-list';
import { Categorie_Entity } from '../domain/entities/categorie.entity';
import { SearchCategorieDto } from '../domain/dto/search-categorie.dto';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

@Injectable()
export class CategorieService {
  constructor(
    @Inject(MongooseCategorieRepository)
    private repository: CategorieRepository,
  ) {}

  create(createCategorieDto: CreateCategorieDto,trz:TrazasService): Promise<Categorie_Entity|string> {
    return this.repository.create(createCategorieDto, trz);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<Categorie_Entity>|string> {
    if (page <= 0 || pageSize <= 0) {
      throw new InvalidPaginationError();
    }
    return this.repository.findAll(page, pageSize);
  }

  findOne(id: string): Promise<Categorie_Entity> {
    return this.repository.findOne(id);
  }

  update(
     updateCategorieDto: UpdateCategorieDto, trz:TrazasService
  ): Promise<Categorie_Entity |string> {
    return this.repository.update(updateCategorieDto, trz);
  }

  remove(id: string, trz:TrazasService): Promise<Categorie_Entity |string> {
    return this.repository.remove(id, trz);
  }
  search(query: SearchCategorieDto): Promise<Categorie_Entity[] |string> {
    return this.repository.search(query);
  }
}
