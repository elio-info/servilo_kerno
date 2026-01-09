import { Inject, Injectable } from '@nestjs/common';
import { DataList } from 'src/modules/common/data-list';
import { Mongoose_ConsejoPopular_Municipality_Repository } from '../infrastructure/mongoose-consejopopular_municipality.repository';
import { ConsejoPopular_Municipality_Repository } from '../domain/repository/consejopopular_municipality.repository';
import { Create_ConsejoPopular_Municipality_Dto } from '../domain/dto/create-consejopopular_municipality.dto';
import { ConsejoPopular_Municipality_Entity } from '../domain/schemas/consejo_popular.entity';
import { Update_ConsejoPopular_Municipality_Dto } from '../domain/dto/update-consejopopular_municipality.dto';
import SearchMunicipalityDto from '../domain/dto/search-consejopopular_municipality.dto';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { getUserHTTP_JWTS } from 'src/modules/common/extractors';

@Injectable()
export class ConsejoPopular_Municipality_Service {
  constructor(
    @Inject(Mongoose_ConsejoPopular_Municipality_Repository)
    private repository: ConsejoPopular_Municipality_Repository,
    @Inject(TrazasService) private traza:TrazasService
  ) {}

  create(create_CPMunicipalityDto: Create_ConsejoPopular_Municipality_Dto,tkhds:string): Promise<ConsejoPopular_Municipality_Entity| string> {
    this.traza.trazaDTO.user=getUserHTTP_JWTS (tkhds);
    this.traza.trazaDTO.operation='save';this.traza.trazaDTO.error='Ok' ;
    return this.repository.create(create_CPMunicipalityDto,this.traza);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<ConsejoPopular_Municipality_Entity>| string> {
    page= (page <= 0 || isNaN (page))? 1:page;
    pageSize= (pageSize <= 0 || isNaN (pageSize ))? 15:pageSize;
    return this.repository.findAll(page, pageSize);
  }

  findOne(id: string): Promise<ConsejoPopular_Municipality_Entity| string> {
    return this.repository.findOne(id);
  }

  update(
    updateMunicipalityDto: Update_ConsejoPopular_Municipality_Dto,
    tkhds:string
  ): Promise<ConsejoPopular_Municipality_Entity| string> {
    this.traza.trazaDTO.user=getUserHTTP_JWTS (tkhds);
    this.traza.trazaDTO.operation='update';this.traza.trazaDTO.error='Ok' ;
    return this.repository.update(updateMunicipalityDto,this.traza);
  }

  remove(id: string,tkhds:string): Promise<ConsejoPopular_Municipality_Entity| string> {
    this.traza.trazaDTO.user=getUserHTTP_JWTS (tkhds);
    this.traza.trazaDTO.operation='remove';this.traza.trazaDTO.error='Ok' ;
    return this.repository.remove(id,this.traza);
  }

  search(query: SearchMunicipalityDto): Promise<ConsejoPopular_Municipality_Entity[] | string> {
    return this.repository.search(query);
  }
}
