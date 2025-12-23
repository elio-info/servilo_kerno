import { Inject, Injectable, UsePipes, ValidationPipe } from '@nestjs/common';

import { InvalidPaginationError } from 'src/modules/common/errors/invalid-pagination.error';
import { DataList } from 'src/modules/common/data-list';
import { Mongoose_ConsejoPopular_Municipality_Repository } from '../infrastructure/mongoose-consejopopular_municipality.repository';
import { ConsejoPopular_Municipality_Repository } from '../domain/repository/consejopopular_municipality.repository';
import { Create_ConsejoPopular_Municipality_Dto } from '../domain/dto/create-consejopopular_municipality.dto';
import { ConsejoPopular_Municipality_Entity } from '../domain/schemas/consejo_popular.entity';
import { Update_ConsejoPopular_Municipality_Dto } from '../domain/dto/update-consejopopular_municipality.dto';
import SearchMunicipalityDto from '../domain/dto/search-consejopopular_municipality.dto';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

@Injectable()
export class ConsejoPopular_Municipality_Service {
  constructor(
    @Inject(Mongoose_ConsejoPopular_Municipality_Repository)
    private repository: ConsejoPopular_Municipality_Repository,
    @Inject(TrazasService) private traza:TrazasService
  ) {}

  create(create_CPMunicipalityDto: Create_ConsejoPopular_Municipality_Dto,tkhds:string): Promise<ConsejoPopular_Municipality_Entity> {
    this.traza.trazaDTO.user=tkhds;
    return this.repository.create(create_CPMunicipalityDto,this.traza);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<ConsejoPopular_Municipality_Entity>> {
    if (page <= 0 || pageSize <= 0) {
      throw new InvalidPaginationError();
    }
    return this.repository.findAll(page, pageSize);
  }

  findOne(id: string): Promise<ConsejoPopular_Municipality_Entity> {
    return this.repository.findOne(id);
  }

  update(
    id: string,
    updateMunicipalityDto: Update_ConsejoPopular_Municipality_Dto,
    tkhds:string
  ): Promise<ConsejoPopular_Municipality_Entity> {
    this.traza.trazaDTO.user=tkhds;
    return this.repository.update(id, updateMunicipalityDto,this.traza);
  }

  remove(id: string,tkhds:string): Promise<ConsejoPopular_Municipality_Entity> {
    return this.repository.remove(id,this.traza);
  }

  search(query: SearchMunicipalityDto): Promise<ConsejoPopular_Municipality_Entity[]> {
    return this.repository.search(query);
  }
}
