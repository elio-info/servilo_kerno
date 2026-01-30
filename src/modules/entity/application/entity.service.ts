import { Inject, Injectable } from '@nestjs/common';
import { InvalidPaginationError } from 'src/modules/common/errors/invalid-pagination.error';
import { DataList } from 'src/modules/common/data-list';
import { MongooseEntityRepository } from '../infrastructure/mongoose-entity.repository';
import { EntityRepository } from '../domain/repository/entity.repository';
import { CreateEntityDto } from '../domain/dto/create-entity.dto';
import { Entity_Entity } from '../domain/entities/entity.entity';
import { UpdateEntityDto } from '../domain/dto/update-entity.dto';
import { SearchEntityDto } from '../domain/dto/search-entity.dto';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { MunicipalityRepository } from 'src/modules/municipality/domain/repository/municipality.repository';
import { getUserHTTP_JWTS, validatePagination } from 'src/modules/common/extractors';

@Injectable()
export class EntityService {
  constructor(
    @Inject(MongooseEntityRepository)
    private entityRepository: EntityRepository,
    private repository: MunicipalityRepository,
    @Inject(TrazasService) private traza:TrazasService
  ) { traza.trazaDTO.collection='Entity'}

  async create(createEntityDto: CreateEntityDto,tkhds:string): Promise<Entity_Entity|string> {
    this.traza.trazaDTO.user=getUserHTTP_JWTS (tkhds);
    this.traza.trazaDTO.operation='save';
    this.traza.trazaDTO.error='Ok';
    return this.entityRepository.create(createEntityDto,this.traza);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<Entity_Entity>|string> {
    page = validatePagination(page,1);
    pageSize= validatePagination(page,15);
    return this.entityRepository.findAll(page, pageSize);
  }

  findOne(id: string): Promise<Entity_Entity|string> {
    return this.entityRepository.findOne(id);
  }

  async update( updateEntityDto: UpdateEntityDto,tkhds: string): Promise<Entity_Entity|string> {
    this.traza.trazaDTO.user=getUserHTTP_JWTS (tkhds);
    this.traza.trazaDTO.operation='update';
    this.traza.trazaDTO.error='Ok';
    this.traza.trazaDTO.filter=updateEntityDto;
    return this.entityRepository.update( updateEntityDto, this.traza);
  }

  remove(id: string, tkhds:string): Promise<Entity_Entity|string> {
    this.traza.trazaDTO.user=getUserHTTP_JWTS (tkhds);
    this.traza.trazaDTO.operation='remove';
    this.traza.trazaDTO.error='Ok';
    return this.entityRepository.remove(id, this.traza);
  }
  search(query: SearchEntityDto): Promise<Entity_Entity[]|string> {
    return this.entityRepository.search(query);
  }
}
