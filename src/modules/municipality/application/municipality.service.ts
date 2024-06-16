import { Inject, Injectable, UsePipes, ValidationPipe } from '@nestjs/common';

import { InvalidPaginationError } from 'src/modules/common/errors/invalid-pagination.error';
import { DataList } from 'src/modules/common/data-list';
import { MongooseMunicipalityRepository } from '../infrastructure/mongoose-municipality.repository';
import { MunicipalityRepository } from '../domain/repository/municipality.repository';
import { CreateMunicipalityDto } from '../domain/dto/create-municipality.dto';
import { Municipality } from '../domain/entities/municipality.entity';
import { UpdateMunicipalityDto } from '../domain/dto/update-municipality.dto';
import SearchMunicipalityDto from '../domain/dto/search-municipality.dto';

@Injectable()
export class MunicipalityService {
  constructor(
    @Inject(MongooseMunicipalityRepository)
    private repository: MunicipalityRepository,
  ) {}

  create(createMunicipalityDto: CreateMunicipalityDto): Promise<void> {
    return this.repository.create(createMunicipalityDto);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<Municipality>> {
    if (page <= 0 || pageSize <= 0) {
      throw new InvalidPaginationError();
    }
    return this.repository.findAll(page, pageSize);
  }

  findOne(id: string): Promise<Municipality> {
    return this.repository.findOne(id);
  }

  update(
    id: string,
    updateMunicipalityDto: UpdateMunicipalityDto,
  ): Promise<Municipality> {
    return this.repository.update(id, updateMunicipalityDto);
  }

  remove(id: string): Promise<void> {
    return this.repository.remove(id);
  }

  search(query: SearchMunicipalityDto): Promise<Municipality[]> {
    return this.repository.search(query);
  }
}
