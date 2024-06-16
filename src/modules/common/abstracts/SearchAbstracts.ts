import { Anonymous } from 'src/modules/authz/decorators/anonymous.decorator';
import { DataList } from '../data-list';

import { Get, Param, Query, Type, UsePipes } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../doc/api-paginated-response.decorator';
import { Municipality } from 'src/modules/municipality/domain/entities/municipality.entity';
import { ApiCustomErrorResponse } from '../doc/api-bad-request-custom-error-response.decorator';
import { ApiUnauthorizedCustomErrorResponse } from '../doc/api-unauthorized-custom-error-response.decorator';
import { ErrorHandler } from '../errors/handler/error-handler.decorator';
import SearchValidate from '../pipes/SearchValidate.pipe';

//TODO Trabajado de Abstract Crud Controller
export default abstract class SearchController<C, U, D extends object> {
  protected abstract readonly service: Service<C, U, D>;
  model: D;
  constructor(model: new () => D) {
    this.model = new model();
  }
  @ApiCustomErrorResponse()
  @Get('search')
  @ErrorHandler()
  search(@Query() query) {
    return this.service.search(query);
  }
}

interface Service<C, U, D> {
  findAll: (page: number, pageSize: number) => Promise<DataList<D>>;
  create: (municipality: C) => Promise<void>;
  findOne: (id: string) => Promise<D>;
  update: (id: string, municipality: U) => Promise<D>;
  remove: (id: string) => Promise<void>;
  search: (query) => Promise<D[]>;
}
