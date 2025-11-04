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
import { data } from 'jquery';
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

  private myTraza : Traza;

  constructor(
    @Inject(MongooseProvinceRepository)
    private repository: ProvinceRepository,
    // private readonly userLog: GlobalInterceptor,
    private traz:TrazasService
  ) {
    
    this.myTraza= new Traza();
    this.myTraza.modulo='Province'
    
  }

  create(createProvinceDto: CreateProvinceDto): Promise<ProvinceModel> {
    
    
    return this.repository.create(createProvinceDto);
  }

  findAll(page = 1, pageSize = 15): Promise<DataList<Province>> {
    page= ( isNaN(page) || page<= 0)? 1: page;
    console.log('page',page);
    
    pageSize= ( isNaN(pageSize) || pageSize<= 0)? 15: pageSize;
    console.log('pagesz',pageSize);
    // this.myTraza.user=this.userLog.
    // if (page  || pageSize <= 0) {
    //   console.log('hay error de cant pages');
      
    //   throw new InvalidPaginationError();
    // }
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
