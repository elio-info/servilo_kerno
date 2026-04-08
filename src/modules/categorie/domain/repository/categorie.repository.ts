import { DataList } from 'src/modules/common/data-list';
import { Categorie_Entity } from '../entities/categorie.entity';
import { UpdateCategorieDto } from '../dto/update-categorie.dto';
import { CreateCategorieDto } from '../dto/create-categorie.dto';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

export interface CategorieRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<Categorie_Entity>|string>;
  create: (categorie: CreateCategorieDto, trz:TrazasService) => Promise<Categorie_Entity|string>;
  findOne: (id: string) => Promise<Categorie_Entity|string>;
  update: (categorie: UpdateCategorieDto, trz:TrazasService) => Promise<Categorie_Entity|string>;
  remove: (id: string, trz:TrazasService) => Promise<Categorie_Entity|string>;
  search: (query) => Promise<Categorie_Entity[]|string>;
}
