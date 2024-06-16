import { DataList } from 'src/modules/common/data-list';
import { Entity } from '../entities/entity.entity';
import { CreateEntityDto } from '../dto/create-entity.dto';
import { UpdateEntityDto } from '../dto/update-entity.dto';

export interface EntityRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<Entity>>;
  create: (entity: CreateEntityDto) => Promise<void>;
  findOne: (id: string) => Promise<Entity>;
  update: (id: string, entity: UpdateEntityDto) => Promise<Entity>;
  remove: (id: string) => Promise<void>;
  search: (query) => Promise<Entity[]>;
}
