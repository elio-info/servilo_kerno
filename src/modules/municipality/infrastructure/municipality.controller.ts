import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ErrorHandler } from 'src/modules/common/errors/handler/error-handler.decorator';
import { MunicipalityService } from '../application/municipality.service';
import { CreateMunicipalityDto } from '../domain/dto/create-municipality.dto';
import { UpdateMunicipalityDto } from '../domain/dto/update-municipality.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { ApiCustomErrorResponse } from 'src/modules/common/doc/api-bad-request-custom-error-response.decorator';
import { ApiPaginatedResponse } from 'src/modules/common/doc/api-paginated-response.decorator';
import { Municipality } from '../domain/entities/municipality.entity';
import { ApiNotFoundCustomErrorResponse } from 'src/modules/common/doc/api-not-found-custom-error-response.decorator';
import { DataList } from 'src/modules/common/data-list';
import SearchValidate from 'src/modules/common/pipes/SearchValidate.pipe';
import { SearchQuery } from 'src/modules/search/domain/dto/query.dto';
import SearchMunicipalityDto from '../domain/dto/search-municipality.dto';
import SearchController from 'src/modules/common/abstracts/SearchAbstracts';

@ApiTags(`municipality`)
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@Controller('municipality')
export class MunicipalityController {
  constructor(protected readonly service: MunicipalityService) {}

  @ApiBody({
    description: 'The municipality object',
    type: CreateMunicipalityDto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
    description: 'Returns 201 when municipality is successfully created',
  })
  @ApiCustomErrorResponse()
  @Post()
  @ErrorHandler()
  create(@Body() createMunicipalityDto: CreateMunicipalityDto) {
    return this.service.create(createMunicipalityDto);
  }

  @ApiQuery({
    name: 'page',
    description: 'The current page. 1 by default',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    description: 'The amount of items in the current page. 15 by default',
    type: 'number',
    required: false,
  })
  @ApiPaginatedResponse(Municipality)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @Get()
  @ErrorHandler()
  findAll(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    return this.service.findAll(page, pageSize);
  }

  @ApiOkResponse({
    description: 'The municipality object',
    type: Municipality,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Municipality')
  @ApiParam({ name: 'id' })
  @Get(':id')
  @ErrorHandler()
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOkResponse({
    description: 'The updated Municipality Object',
    type: Municipality,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Municipality')
  @ApiBody({
    type: CreateMunicipalityDto,
  })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  @ErrorHandler()
  update(
    @Param('id') id: string,
    @Body() updateMunicipalityDto: UpdateMunicipalityDto,
  ) {
    return this.service.update(id, updateMunicipalityDto);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Municipality')
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The municipality successfully deleted' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  @ErrorHandler()
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  //TODO Making Search Endpoint By Query
  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Municipality')
  @ApiQuery({
    name: 'key',
    description: 'The key name for the search',
    type: 'string',
    required: false,
  })
  @ApiQuery({
    name: 'value',
    description: 'The value for the search',
    type: 'string',
    required: false,
  })
  @ApiCustomErrorResponse()
  @UsePipes(new SearchValidate(SearchMunicipalityDto))
  @Get('api/search')
  @ErrorHandler()
  search(@Query() query) {
    return this.service.search(query);
  }
}
