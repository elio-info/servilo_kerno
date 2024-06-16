import { DataList } from 'src/modules/common/data-list';
import { Categorie } from '../entities/categorie.entity';
import { UpdateCategorieDto } from '../dto/update-categorie.dto';
import { CreateCategorieDto } from '../dto/create-categorie.dto';

export interface CategorieRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<Categorie>>;
  create: (categorie: CreateCategorieDto) => Promise<void>;
  findOne: (id: string) => Promise<Categorie>;
  update: (id: string, categorie: UpdateCategorieDto) => Promise<Categorie>;
  remove: (id: string) => Promise<void>;
  search: (query) => Promise<Categorie[]>;
}
