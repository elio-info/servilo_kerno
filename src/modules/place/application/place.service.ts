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
import { getUserHTTP_JWTS } from 'src/modules/common/extractors';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

@Injectable()
export class PlaceService {
  constructor(
    @Inject(MongoosePlaceRepository)
    private placeRepository: PlaceRepository,
   @Inject(TrazasService) private traza:TrazasService
    ) { traza.trazaDTO.collection='Place'}

  create(createPlaceDto: CreatePlaceDto,tkhds:string): Promise<Place|string> {
      this.traza.trazaDTO.user=getUserHTTP_JWTS (tkhds);
      this.traza.trazaDTO.operation='save';
      this.traza.trazaDTO.filter=createPlaceDto;
      this.traza.trazaDTO.error='Ok';
    return this.placeRepository.create(createPlaceDto,this.traza);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<Place>|string> {
    page= ( isNaN(page) || page<= 0)? 1: page;
    console.log('page',page);
    
    pageSize= ( isNaN(pageSize) || pageSize<= 0)? 15: pageSize;
    console.log('pagesz',pageSize);
    return this.placeRepository.findAll(page, pageSize);
  }

  findOne(id: string): Promise<Place|string> {
    return this.placeRepository.findOne(id);
  }

  update(updatePlaceDto: UpdatePlaceDto, tkhds:string): Promise<Place|string> {
    this.traza.trazaDTO.user=getUserHTTP_JWTS (tkhds);
      this.traza.trazaDTO.operation='update';
      this.traza.trazaDTO.filter=updatePlaceDto;
      this.traza.trazaDTO.error='Ok';
      return this.placeRepository.update( updatePlaceDto,this.traza);
  }

  remove(id: string,tkhds:string): Promise<Place|string> {
    this.traza.trazaDTO.user=getUserHTTP_JWTS (tkhds);
      this.traza.trazaDTO.operation='remove';
      this.traza.trazaDTO.filter={id:id};
      this.traza.trazaDTO.error='Ok';
    return this.placeRepository.remove(id, this.traza);
  }

  search(query: SearchPlaceDto): Promise<Place[]|string> {
    return this.placeRepository.search(query);
  }
}
