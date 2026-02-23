import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, Headers, Put } from '@nestjs/common';
import { NomenclaCategorias_ContratacionManifestacion_Service } from './n_catgcont-m.service';
import { Create_NomenclaCategorias_ContratacionManifestacion_Dto } from '../dto/create-n_catgcont-m.dto';
import { Update_NomenclaCategorias_ContratacionManifestacion_Dto } from '../dto/update-n_catgcont-m.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiCustomErrorResponse } from 'src/modules/common/doc/api-bad-request-custom-error-response.decorator';
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { CreateProvinceDto } from 'src/modules/province/domain/dto/create-province.dto';
import { ApiPaginatedResponse } from 'src/modules/common/doc/api-paginated-response.decorator';
import { ProvinceEntity } from 'src/modules/province/domain/entities/province.entity';
import { NomenclaCategorias_ContratacionManifestacion_Entity } from '../schemas/n_catcont-m.entity';
import { ErrorHandler } from 'src/modules/common/errors/handler/error-handler.decorator';
import { Remove_NomenclaCategorias_ContratacionManifestacion_Dto } from '../dto/remove-n_catgcont-m.dto';
import { Search_NomenclaCategorias_ContratacionManifestacion_Dto } from '../dto/search-n_catgcont-m.dto';
import { ApiNotFoundCustomErrorResponse } from 'src/modules/common/doc/api-not-found-custom-error-response.decorator';
import { NomenclaCat_ContManifestacion_Especialidad_Entity } from '../../n_catgcont-m_espc/schemas/n_catgcont-m_espc.entity';

@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@Controller('nomenclacategorias-contmanifestacion')
@ApiTags( 'Nomenclador de Categorias de Contratacion de Manifestacion Artistica')
export class Nomencla_Categorias_ContratacionManifestacion_Controller {
  constructor(private readonly service: 
    NomenclaCategorias_ContratacionManifestacion_Service) {}

  @ApiQuery({
    name: 'page',
    description: 'The current page. 1 by default',
    type: 'number',
    required: false    
  })
  @ApiQuery({
    name: 'pageSize',
    description: 'The amount of items in the current page. 15 by default',
    type: 'number',
    required: false    
  })
  @ApiPaginatedResponse(NomenclaCategorias_ContratacionManifestacion_Entity)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @ApiOperation({ summary:'Recuperar todas las categorias'})
  @Get()
  @ErrorHandler()
  findAll(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    return this.service.findAll(page, pageSize);
  }
  
    @ApiOkResponse({
      description: 'The categoria object',
      type: NomenclaCategorias_ContratacionManifestacion_Entity,
    })
    @ApiUnauthorizedCustomErrorResponse()
    @ApiCustomErrorResponse()
    @ApiNotFoundCustomErrorResponse('Categoria Cultural')
    @ApiParam({ name: 'id' })
    @Get(':id')
    @ErrorHandler()
    findOne(@Param('id') id: string) {
      return this.service.findOne(id);
    }
      
  @ApiBody({
    description: 'The Manifestacion Cultural object',
    type: Create_NomenclaCategorias_ContratacionManifestacion_Dto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
    description: 'Returns 201 when Manifestacion Cultural is successfully created',
  })
  @ApiCustomErrorResponse()
  @ApiOperation({ summary:'Crear Nomenclador de categorias Manifestacion Cultural'})
  @Post()
  @ErrorHandler()
  async create(@Body() createNomencla_Categorias_ContratacionManifestacion_Dto: Create_NomenclaCategorias_ContratacionManifestacion_Dto , @Headers('authorization') hds): Promise<NomenclaCategorias_ContratacionManifestacion_Entity|string> {
    return this.service.create(createNomencla_Categorias_ContratacionManifestacion_Dto, hds);
  }

  
    @ApiOkResponse({
      description: 'The updated Categoria Cultural Object',
      type: NomenclaCategorias_ContratacionManifestacion_Entity,
    })
    @ApiUnauthorizedCustomErrorResponse()
    @ApiCustomErrorResponse()
    @ApiNotFoundCustomErrorResponse('Categoria Cultural')
    @ApiBody({
      type: Update_NomenclaCategorias_ContratacionManifestacion_Dto,
    })  
    @Patch()
    @ErrorHandler()
    update(@Body() updateDto: Update_NomenclaCategorias_ContratacionManifestacion_Dto,@Headers('authorization') hds ) {
      return this.service.update(updateDto,hds);
    }
  
    @ApiUnauthorizedCustomErrorResponse()
    @ApiNotFoundCustomErrorResponse('Manifestacion Cultural')
    @ApiCustomErrorResponse()
    @ApiOkResponse({ description: 'The Manifestacion Cultural successfully deleted' })
    @ApiBody({
      type: Remove_NomenclaCategorias_ContratacionManifestacion_Dto,
    })  
    @Delete()
    @ErrorHandler()
    remove(@Body() remo: Remove_NomenclaCategorias_ContratacionManifestacion_Dto,@Headers('authorization') hds) {
      // console.log(getUserHTTP_JWTS(hds));    
      return this.service.remove(remo.id,hds);
    }
  
    @ApiUnauthorizedCustomErrorResponse()
    @ApiNotFoundCustomErrorResponse('Mani Cultural')  
    @ApiBody({
      description: 'se buca a partir de : nombre de provincia, si buscas el nombre completo, si buscas borrados o no',
      type: Search_NomenclaCategorias_ContratacionManifestacion_Dto,
    })  
    @ApiCustomErrorResponse()
    @Put()//'search'
    @ErrorHandler()
    search(@Body() query:Search_NomenclaCategorias_ContratacionManifestacion_Dto ) {
      // console.log(query);    
      return this.service.search(query);
    }
}
