import { Inject, Injectable } from '@nestjs/common';
import { CreateEntityTypeDto } from '../domain/dto/create-entity-type.dto';
import { UpdateEntityTypeDto } from '../domain/dto/update-entity-type.dto';
import { EntityTypeRepository } from '../domain/repository/entity-type.repository';
import { MongooseEntityTypeRepository } from '../infrastructure/mongoose-entity-type.repository';
import { InvalidPaginationError } from '../../common/errors/invalid-pagination.error';
import { DataList } from '../../common/data-list';
import { EntityType } from '../domain/entities/entity-type.entity';
import { SearchEntityTypeDto } from '../domain/dto/search-entity-type.dto';

@Injectable()
export class EntityTypeService {
  constructor(
    @Inject(MongooseEntityTypeRepository)
    private repository: EntityTypeRepository,
  ) {}

  create(createEntityTypeDto: CreateEntityTypeDto): Promise<void> {
    return this.repository.create(createEntityTypeDto);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<EntityType>> {
    if (page <= 0 || pageSize <= 0) {
      throw new InvalidPaginationError();
    }
    return this.repository.findAll(page, pageSize);
  }

  findOne(id: string): Promise<EntityType> {
    return this.repository.findOne(id);
  }

  update(
    id: string,
    updateEntityTypeDto: UpdateEntityTypeDto,
  ): Promise<EntityType> {
    return this.repository.update(id, updateEntityTypeDto);
  }

  remove(id: string): Promise<void> {
    return this.repository.remove(id);
  }
  search(query: SearchEntityTypeDto): Promise<EntityType[]> {
    return this.repository.search(query);
  }
}
