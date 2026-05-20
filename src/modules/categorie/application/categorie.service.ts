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
import { validatePagination } from 'src/modules/common/extractors';

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
    
    return this.repository.findAll(validatePagination (page,1), validatePagination(pageSize,15));
  }

  findOne(id: string): Promise<Categorie_Entity |string> {
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
