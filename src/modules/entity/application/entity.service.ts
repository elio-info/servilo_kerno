import { Inject, Injectable } from '@nestjs/common';

import { InvalidPaginationError } from 'src/modules/common/errors/invalid-pagination.error';
import { DataList } from 'src/modules/common/data-list';
import { MongooseEntityRepository } from '../infrastructure/mongoose-entity.repository';
import { EntityRepository } from '../domain/repository/entity.repository';
import { CreateEntityDto } from '../domain/dto/create-entity.dto';
import { Entity } from '../domain/entities/entity.entity';
import { UpdateEntityDto } from '../domain/dto/update-entity.dto';
import { SearchEntityDto } from '../domain/dto/search-entity.dto';

@Injectable()
export class EntityService {
  constructor(
    @Inject(MongooseEntityRepository)
    private entityRepository: EntityRepository,
  ) {}

  async create(createEntityDto: CreateEntityDto): Promise<void> {
    return this.entityRepository.create(createEntityDto);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<Entity>> {
    if (page <= 0 || pageSize <= 0) {
      throw new InvalidPaginationError();
    }
    return this.entityRepository.findAll(page, pageSize);
  }

  findOne(id: string): Promise<Entity> {
    return this.entityRepository.findOne(id);
  }

  async update(id: string, updateEntityDto: UpdateEntityDto): Promise<Entity> {
    return this.entityRepository.update(id, updateEntityDto);
  }

  remove(id: string): Promise<void> {
    return this.entityRepository.remove(id);
  }
  search(query: SearchEntityDto): Promise<Entity[]> {
    return this.entityRepository.search(query);
  }
}
