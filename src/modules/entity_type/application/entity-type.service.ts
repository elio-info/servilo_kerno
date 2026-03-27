import { Inject, Injectable } from '@nestjs/common';
import { CreateEntityTypeDto } from '../domain/dto/create-entity-type.dto';
import { UpdateEntityTypeDto } from '../domain/dto/update-entity-type.dto';
import { EntityTypeRepository } from '../domain/repository/entity-type.repository';
import { MongooseEntityTypeRepository } from '../infrastructure/mongoose-entity-type.repository';
import { InvalidPaginationError } from '../../common/errors/invalid-pagination.error';
import { DataList } from '../../common/data-list';
import { EntityType } from '../domain/entities/entity-type.entity';
import { SearchEntityTypeDto } from '../domain/dto/search-entity-type.dto';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { query } from 'express';
import { getUserHTTP_JWTS } from 'src/modules/common/extractors';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';

@Injectable()
export class EntityTypeService {
  constructor(
    @Inject(MongooseEntityTypeRepository)
    private repository: EntityTypeRepository,
    @Inject(TrazasService) private traza:TrazasService
    ) { traza.trazaDTO.collection='Entity-Type'}


  create(createEntityTypeDto: CreateEntityTypeDto,tkhds:string): Promise<EntityType | string> {
    this.traza.trazaDTO.user=getUserHTTP_JWTS (tkhds); 
    this.traza.trazaDTO.operation='save';
    this.traza.trazaDTO.error='Ok';
    return this.repository.create(createEntityTypeDto,this.traza);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<EntityType>| string> {
    page= ( isNaN(page) || page<= 0)? 1: page;
    console.log('page',page);
    
    pageSize= ( isNaN(pageSize) || pageSize<= 0)? 15: pageSize;
    console.log('pagesz',pageSize);
    return this.repository.findAll(page, pageSize);
  }

  findOne(id: string): Promise<EntityType | string> {
    return this.repository.findOne(id);
  }

  update(
    updateEntityTypeDto: UpdateEntityTypeDto,tkhds:string ): Promise<EntityType| string> {
    this.traza.trazaDTO.user=getUserHTTP_JWTS (tkhds); 
    this.traza.trazaDTO.operation='update';
    this.traza.trazaDTO.error='Ok';
    return this.repository.update( updateEntityTypeDto,this.traza);
  }

  remove(id: string,tkhds): Promise<EntityType|string> {
    this.traza.trazaDTO.user=getUserHTTP_JWTS (tkhds); 
    this.traza.trazaDTO.operation='remove';
    this.traza.trazaDTO.error='Ok';
    return this.repository.remove(id,this.traza);
  }
  search(query: SearchEntityTypeDto): Promise<EntityType[]| string> {
    return this.repository.search(query);
  }
}
