import { DataList } from 'src/modules/common/data-list';
import { EntityType } from '../entities/entity-type.entity';
import { UpdateEntityTypeDto } from '../dto/update-entity-type.dto';
import { CreateEntityTypeDto } from '../dto/create-entity-type.dto';

export interface EntityTypeRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<EntityType>>;
  create: (entityType: CreateEntityTypeDto) => Promise<void>;
  findOne: (id: string) => Promise<EntityType>;
  update: (id: string, entityType: UpdateEntityTypeDto) => Promise<EntityType>;
  remove: (id: string) => Promise<void>;
  search: (query) => Promise<EntityType[]>;
}
