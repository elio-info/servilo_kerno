import { CanActivate, Inject, Injectable } from '@nestjs/common';
import { CreateProvinceDto } from '../domain/dto/create-province.dto';
import { UpdateProvinceDto } from '../domain/dto/update-province.dto';
import { ProvinceRepository } from '../domain/repository/province.repository';
import { MongooseProvinceRepository } from '../infrastructure/mongoose-province.repository';
import { InvalidPaginationError } from 'src/modules/common/errors/invalid-pagination.error';
import { DataList } from 'src/modules/common/data-list';
import { Province } from '../domain/entities/province.entity';
import { SearchProvinceDto } from '../domain/dto/search-province.dto';
import { ProvinceModel } from '../infrastructure/province.schema';
import { DuplicatedValueError } from 'src/modules/common/errors/duplicated-value.error';
import { Traza } from 'src/cultura/trazas/entities/traza.entity';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { AuthService } from 'src/modules/auth/auth.service';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { JwtAuthGuard } from 'src/modules/authz/guards/jwt-auth.guard';
import { GlobalInterceptor } from 'src/modules/common/interceptors/Global.interceptor';
import { AppController } from 'src/app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Injectable()
export class ProvinceService   {
 
  constructor(
    @Inject(MongooseProvinceRepository)
    private repository: ProvinceRepository,
    private traz:TrazasService
  ) {    
    
    this.traz.traza_Modulo='Province'
    
  }

  create(createProvinceDto: CreateProvinceDto,tkhds:string): Promise<ProvinceModel> {
    this.traz.traza_Usr=tkhds;    
    this.traz.traza_Accion='create';   
    this.traz.traza_Metodo='POST';   
    
    return this.repository.create(createProvinceDto,this.traz);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<Province>> {
    
    page= ( isNaN(page) || page<= 0)? 1: page;
    console.log('page',page);
    
    pageSize= ( isNaN(pageSize) || pageSize<= 0)? 15: pageSize;
    console.log('pagesz',pageSize);
    
    
    return this.repository.findAll(page, pageSize);
  }

  findOne(id: string): Promise<Province> {
    return this.repository.findOne(id);
  }

  update(id: string, updateProvinceDto: UpdateProvinceDto): Promise<Province> {
    return this.repository.update(id, updateProvinceDto);
  }

  remove(id: string): Promise<Province> {
    return this.repository.remove(id);
  }

  search(query: SearchProvinceDto): Promise<Province> {
    console.log(query);
    
    return this.repository.search(query);
  }
}
