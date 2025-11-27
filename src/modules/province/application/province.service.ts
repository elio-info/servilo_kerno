import { Inject, Injectable } from '@nestjs/common';
import { CreateProvinceDto } from '../domain/dto/create-province.dto';
import { UpdateProvinceDto } from '../domain/dto/update-province.dto';
import { ProvinceRepository } from '../domain/repository/province.repository';
import { MongooseProvinceRepository } from '../infrastructure/mongoose-province.repository';
import { DataList } from 'src/modules/common/data-list';
import { Province } from '../domain/entities/province.entity';
import { SearchProvinceDto } from '../domain/dto/search-province.dto';
import { ProvinceDocument, ProvinceModel } from '../infrastructure/province.schema';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

@Injectable()
export class ProvinceService   {
 
  constructor(
    @Inject(MongooseProvinceRepository)
    private repository: ProvinceRepository,
    @Inject(TrazasService) private traza:TrazasService
  ) {       
    traza.trazaDTO.collection=ProvinceModel.name;
    
     }

  create(createProvinceDto: CreateProvinceDto,tkhds:string): Promise<ProvinceModel> {
    this.traza.trazaDTO.user=tkhds;    
    this.traza.trazaDTO.operation='save';this.traza.trazaDTO.error='Ok' ; 
    return this.repository.create(createProvinceDto,this.traza);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<ProvinceModel>> {
    
    page= ( isNaN(page) || page<= 0)? 1: page;
    console.log('page',page);
    
    pageSize= ( isNaN(pageSize) || pageSize<= 0)? 15: pageSize;
    console.log('pagesz',pageSize);
    
    
    return this.repository.findAll(page, pageSize);
  }

  findOne(id: string): Promise<ProvinceModel> {
    return this.repository.findOne(id);
  }

  update(id: string, updateProvinceDto: UpdateProvinceDto,tkhds:string): Promise<ProvinceModel> {
    this.traza.trazaDTO.user=tkhds;     
    this.traza.trazaDTO.operation='update';this.traza.trazaDTO.error='Ok' ; 
    return this.repository.update(id, updateProvinceDto, this.traza);
  }

  remove(id: string,tkhds:string): Promise<ProvinceModel> {
    this.traza.trazaDTO.user=tkhds;    
    this.traza.trazaDTO.operation='remove';this.traza.trazaDTO.error='Ok' ; 
    return this.repository.remove(id,this.traza);
  }

  search(query: SearchProvinceDto): Promise<ProvinceModel[]> {
    console.log(query);
    
    return this.repository.search(query);
  }
}
