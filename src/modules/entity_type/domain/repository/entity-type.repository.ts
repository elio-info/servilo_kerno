import { DataList } from 'src/modules/common/data-list';
import { EntityType } from '../entities/entity-type.entity';
import { UpdateEntityTypeDto } from '../dto/update-entity-type.dto';
import { CreateEntityTypeDto } from '../dto/create-entity-type.dto';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

export interface EntityTypeRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<EntityType>|string>;
  create: (entityType: CreateEntityTypeDto,traza:TrazasService) => Promise<EntityType|string>;
  findOne: (id: string) => Promise<EntityType|string>;
  update: (entityType: UpdateEntityTypeDto,traza:TrazasService) => Promise<EntityType|string>;
  remove: (id: string,traza:TrazasService) => Promise<EntityType|string>;
  search: (query) => Promise<EntityType[]|string>;
}
