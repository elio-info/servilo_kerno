import { Inject, Injectable } from '@nestjs/common';

import { InvalidPaginationError } from 'src/modules/common/errors/invalid-pagination.error';
import { DataList } from 'src/modules/common/data-list';
import { MongoosePlaceRepository } from '../infrastructure/mongoose-place.repository';
import { PlaceRepository } from '../domain/repository/place.repository';
import { CreatePlaceDto } from '../domain/dto/create-place.dto';
import { UpdatePlaceDto } from '../domain/dto/update-place.dto';
import { hashPassword as hash } from 'src/modules/common/helpers/password.hasher';
import { Place } from '../domain/entities/place.entity';
import { SearchPlaceDto } from '../domain/dto/search-place.dto';

@Injectable()
export class PlaceService {
  constructor(
    @Inject(MongoosePlaceRepository)
    private placeRepository: PlaceRepository,
  ) {}

  create(createPlaceDto: CreatePlaceDto) {
    return this.placeRepository.create(createPlaceDto);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<Place>> {
    if (page <= 0 || pageSize <= 0) {
      throw new InvalidPaginationError();
    }
    return this.placeRepository.findAll(page, pageSize);
  }

  findOne(id: string): Promise<Place> {
    return this.placeRepository.findOne(id);
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    return this.placeRepository.update(id, updatePlaceDto);
  }

  remove(id: string): Promise<void> {
    return this.placeRepository.remove(id);
  }

  search(query: SearchPlaceDto): Promise<Place[]> {
    return this.placeRepository.search(query);
  }
}
