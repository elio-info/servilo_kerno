import { DataList } from 'src/modules/common/data-list';
import { Entity_Entity } from '../entities/entity.entity';
import { CreateEntityDto } from '../dto/create-entity.dto';
import { UpdateEntityDto } from '../dto/update-entity.dto';
import { SearchEntityDto } from '../dto/search-entity.dto';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

export interface EntityRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<Entity_Entity>|string>;
  create: (entity: CreateEntityDto,tkhds:TrazasService) => Promise<Entity_Entity|string>;
  findOne: (id: string) => Promise<Entity_Entity|string>;
  update: ( entity: UpdateEntityDto,tkhds:TrazasService) => Promise<Entity_Entity|string>;
  remove: (id: string,tkhds:TrazasService) => Promise<Entity_Entity |string>;
  search: (query:SearchEntityDto) => Promise<Entity_Entity[]|string>;
}
