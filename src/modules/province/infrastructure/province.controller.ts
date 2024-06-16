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
} from '@nestjs/common';
import { ProvinceService } from '../application/province.service';
import { CreateProvinceDto } from '.././domain/dto/create-province.dto';
import { UpdateProvinceDto } from '.././domain/dto/update-province.dto';
import { ErrorHandler } from 'src/modules/common/errors/handler/error-handler.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { ApiCustomErrorResponse } from 'src/modules/common/doc/api-bad-request-custom-error-response.decorator';
import { Province } from '../domain/entities/province.entity';
import { ApiPaginatedResponse } from 'src/modules/common/doc/api-paginated-response.decorator';
import { ApiNotFoundCustomErrorResponse } from 'src/modules/common/doc/api-not-found-custom-error-response.decorator';
import SearchValidate from 'src/modules/common/pipes/SearchValidate.pipe';
import { SearchProvinceDto } from '../domain/dto/search-province.dto';

@ApiTags(`province`)
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@Controller('province')
export class ProvinceController {
  constructor(private readonly service: ProvinceService) {}

  @ApiBody({
    description: 'The province object',
    type: CreateProvinceDto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
    description: 'Returns 201 when province is successfully created',
  })
  @ApiCustomErrorResponse()
  @Post()
  @ErrorHandler()
  create(@Body() createProvinceDto: CreateProvinceDto) {
    return this.service.create(createProvinceDto);
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
  @ApiPaginatedResponse(Province)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @Get()
  @ErrorHandler()
  findAll(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    return this.service.findAll(page, pageSize);
  }

  @ApiOkResponse({
    description: 'The province object',
    type: Province,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Province')
  @ApiParam({ name: 'id' })
  @Get(':id')
  @ErrorHandler()
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOkResponse({
    description: 'The updated Province Object',
    type: Province,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Province')
  @ApiBody({
    type: CreateProvinceDto,
  })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  @ErrorHandler()
  update(
    @Param('id') id: string,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ) {
    return this.service.update(id, updateProvinceDto);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Province')
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The province successfully deleted' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  @ErrorHandler()
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Province')
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
  @UsePipes(new SearchValidate(SearchProvinceDto))
  @Get('api/search')
  @ErrorHandler()
  search(@Query() query) {
    return this.service.search(query);
  }
}
