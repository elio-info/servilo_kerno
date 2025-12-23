import { Inject, Injectable, UsePipes, ValidationPipe } from '@nestjs/common';

import { InvalidPaginationError } from 'src/modules/common/errors/invalid-pagination.error';
import { DataList } from 'src/modules/common/data-list';
import { MongooseMunicipalityRepository } from '../infrastructure/mongoose-municipality.repository';
import { MunicipalityRepository } from '../domain/repository/municipality.repository';
import { CreateMunicipalityDto } from '../domain/dto/create-municipality.dto';
import { Municipality } from '../domain/entities/municipality.entity';
import { UpdateMunicipalityDto } from '../domain/dto/update-municipality.dto';
import SearchMunicipalityDto from '../domain/dto/search-municipality.dto';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { privateDecrypt } from 'crypto';

@Injectable()
export class MunicipalityService {
  constructor(
    @Inject(MongooseMunicipalityRepository)
    private repository: MunicipalityRepository,
    @Inject(TrazasService) private traza:TrazasService
  ) { traza.trazaDTO.collection='Municipality'}

  create(createMunicipalityDto: CreateMunicipalityDto,tkhds:string): Promise<Municipality> {
        this.traza.trazaDTO.user=tkhds; 
    return this.repository.create(createMunicipalityDto,this.traza);
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

  update( id: string, updateMunicipalityDto: UpdateMunicipalityDto, tkhds:string ): Promise<Municipality> {
        this.traza.trazaDTO.user=tkhds;    
    return this.repository.update(id, updateMunicipalityDto,this.traza);
  }

  remove(id: string,tkhds:string): Promise<Municipality> {
        this.traza.trazaDTO.user=tkhds;    
    return this.repository.remove(id,this.traza);
  }

  search(query: SearchMunicipalityDto): Promise<Municipality[]> {
    return this.repository.search(query);
  }
}
