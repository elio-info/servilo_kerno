import { Inject, Injectable } from '@nestjs/common';
import { CreateCategorieDto } from '../domain/dto/create-categorie.dto';
import { UpdateCategorieDto } from '../domain/dto/update-categorie.dto';
import { CategorieRepository } from '../domain/repository/categorie.repository';
import { MongooseCategorieRepository } from '../infrastructure/mongoose-categorie.repository';
import { InvalidPaginationError } from '../../common/errors/invalid-pagination.error';
import { DataList } from '../../common/data-list';
import { Categorie } from '../domain/entities/categorie.entity';
import { SearchCategorieDto } from '../domain/dto/search-categorie.dto';

@Injectable()
export class CategorieService {
  constructor(
    @Inject(MongooseCategorieRepository)
    private repository: CategorieRepository,
  ) {}

  create(createCategorieDto: CreateCategorieDto): Promise<void> {
    return this.repository.create(createCategorieDto);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<Categorie>> {
    if (page <= 0 || pageSize <= 0) {
      throw new InvalidPaginationError();
    }
    return this.repository.findAll(page, pageSize);
  }

  findOne(id: string): Promise<Categorie> {
    return this.repository.findOne(id);
  }

  update(
    id: string,
    updateCategorieDto: UpdateCategorieDto,
  ): Promise<Categorie> {
    return this.repository.update(id, updateCategorieDto);
  }

  remove(id: string): Promise<void> {
    return this.repository.remove(id);
  }
  search(query: SearchCategorieDto): Promise<Categorie[]> {
    return this.repository.search(query);
  }
}
