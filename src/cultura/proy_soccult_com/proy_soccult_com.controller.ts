import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Query } from '@nestjs/common';
import { Proyecto_Sociocultural_Comunitario_Service } from './proy_soccult_com.service';
import { Create_Proyecto_Sociocultural_Comunitario_Dto } from './dto/create_proy_soccult_com.dto';
import { Update_Proyecto_Sociocultural_Comunitario_Dto } from './dto/update_proy_soccult_com.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiCustomErrorResponse } from 'src/modules/common/doc/api-bad-request-custom-error-response.decorator';
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { ErrorHandler } from 'src/modules/common/errors/handler/error-handler.decorator';
import { getUserHTTP_JWTS } from 'src/modules/common/extractors';
import { ConsejoPopular_Municipality_Entity } from '../consejo_popular/domain/schemas/consejo_popular.entity';
import { ApiPaginatedResponse } from 'src/modules/common/doc/api-paginated-response.decorator';
import { ApiNotFoundCustomErrorResponse } from 'src/modules/common/doc/api-not-found-custom-error-response.decorator';
import { Municipality } from 'src/modules/municipality/domain/entities/municipality.entity';
import { Proyecto_Socioculturale_Comunitario_Entity } from './schemas/proy_soccult_com.entity';
import { Search_Proyecto_Sociocultural_Comunitario_Dto } from './dto/search_proy_soccult_com.dto';

@ApiTags('Proyecto Sociocultural Comunitario')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@Controller('proy-soccult-com')
export class Proyecto_Sociocultural_Comunitario_Controller {
  constructor(private readonly proySoccultComService: Proyecto_Sociocultural_Comunitario_Service) {}

  @ApiBody({description:'Descripcion de un Proy Socl Comunitario',
    type:Create_Proyecto_Sociocultural_Comunitario_Dto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
      description: 'Returns 201 when consejo is successfully created',
    })
  @ApiCustomErrorResponse()
  @ErrorHandler()
  @Post()
  create(@Body() createProySoccultComDto: Create_Proyecto_Sociocultural_Comunitario_Dto, @Headers('authorization') hds) {
    return this.proySoccultComService.create(createProySoccultComDto, getUserHTTP_JWTS(hds));
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
  @ApiPaginatedResponse(ConsejoPopular_Municipality_Entity)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @Get()
  @ErrorHandler()
  @Get()
  findAll(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    return this.proySoccultComService.findAll(page,pageSize);
  }

  @ApiOkResponse({
    description: 'The Proyecto_Sociocultural_Comunitario object',
    type: Proyecto_Socioculturale_Comunitario_Entity,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Consejo_Popular_Municipal')
  @ApiParam({ name: 'id' })
  @Get(':id')
  @ErrorHandler()
  findOne(@Param('id') id: string) {
    return this.proySoccultComService.findOne(id);
  }

  @ApiOkResponse({
    description: 'The updated Proyecto_Sociocultural_Comunitario Object',
    type: Proyecto_Socioculturale_Comunitario_Entity,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Proyecto_Sociocultural_Comunitario')
  @ApiBody({
    type: Create_Proyecto_Sociocultural_Comunitario_Dto,
  })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  @ErrorHandler()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProySoccultComDto: Update_Proyecto_Sociocultural_Comunitario_Dto , @Headers('authorization') hds) {
    return this.proySoccultComService.update(id, updateProySoccultComDto, getUserHTTP_JWTS(hds));
  }

  
  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Municipality')
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The municipality successfully deleted' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  @ErrorHandler()
  remove(@Param('id') id: string, @Headers('authorization') hds) {
    return this.proySoccultComService.remove(id,getUserHTTP_JWTS(hds));
  }

  //TODO Making Search Endpoint By Query
  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Proyecto_Sociocultural_Comunitario')
  @ApiBody({
    description: 'The key name for the search',
    type: Search_Proyecto_Sociocultural_Comunitario_Dto,
    required: true,
  })  
  @ApiCustomErrorResponse()
  @Post('search')
  @ErrorHandler()
  search(@Body() query) {
    console.log(query);
    
    return this.proySoccultComService.search(query);
  }
}
