import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, Headers, Put } from '@nestjs/common';
import { Nomencla_Categorias_ContratacionManifestacion_Especialidad_Service } from './n_catgcont-m_espc.service';
import { Create_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto } from '../dto/create-n_catgcont-m_espc.dto';
import { Update_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto } from '../dto/update-n_catgcont-m_espc.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiCustomErrorResponse } from 'src/modules/common/doc/api-bad-request-custom-error-response.decorator';
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { ErrorHandler } from 'src/modules/common/errors/handler/error-handler.decorator';
import { NomenclaCat_ContManifestacion_Especialidad_Entity } from '../schemas/n_catgcont-m_espc.entity';
import { ApiPaginatedResponse } from 'src/modules/common/doc/api-paginated-response.decorator';
import { ApiNotFoundCustomErrorResponse } from 'src/modules/common/doc/api-not-found-custom-error-response.decorator';
import { Remove_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto } from '../dto/remove-n_catgcont-m_espc.dto';
import { Search_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto } from '../dto/search-n_catgcont-m_espc.dto';

@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@Controller('nomenclacategorias-contmanifestacion-especialidad')
@ApiTags( 'Nomenclador de Categorias de Contratacion de Especialidad de Manifestacion Artistica')
export class Nomencla_Categorias_ContratacionManifestacion_Especialidad_Controller {
  constructor(private readonly nomencla_CCM_Esp_Service: 
    Nomencla_Categorias_ContratacionManifestacion_Especialidad_Service) {}

  @ApiQuery({name: 'page',
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
  @ApiPaginatedResponse(NomenclaCat_ContManifestacion_Especialidad_Entity)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @ApiOperation({ summary:'Recuperar todas las categorias'})
  @Get()
  @ErrorHandler()
  findAll(@Query() page:number,@Query() pageSize:number) {
    return this.nomencla_CCM_Esp_Service.findAll(page,pageSize);
  }

  @ApiQuery({
    name: 'id',
    description: 'The items in the colletion',
    type: 'number',
    required: true    
  })
  @ApiPaginatedResponse(NomenclaCat_ContManifestacion_Especialidad_Entity)
  @ApiCustomErrorResponse('Invalid code')
  @ApiUnauthorizedCustomErrorResponse('Usuario no valido')
  @ApiOperation({ summary:'Recuperar la categoria especial'})
  @ApiNotFoundCustomErrorResponse('Categoria Manifestacion Especial mal')
  @Get(':id')
  @ErrorHandler()
  findOne(@Param('id') id: string) {
    return this.nomencla_CCM_Esp_Service.findId(id);
  }

  @ApiBody({
    description: 'The Manifestacion Cultural object',
    type: Create_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
    description: 'Returns 201 when Manifestacion Cultural Especialidad is successfully created',
  })
  @ApiCustomErrorResponse()
  @ApiOperation({ summary:'Crear Nomenclador de categoriaEspecialidad de  Manifestacion Cultural'})
  @Post()
  @ErrorHandler()
  create(@Body() create_nccm_esp_Dto: Create_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto, @Headers('authorization') hds) {
  return  this.nomencla_CCM_Esp_Service.create(create_nccm_esp_Dto, hds);
   
}  

  @ApiOkResponse({
    description: 'The updated Categoria Manifestacion Cultural Especial Object',
    type: NomenclaCat_ContManifestacion_Especialidad_Entity,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Categoria Manifestacion Cultural Especial')
  @ApiBody({
    type: Update_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto,
  }) 
  @Patch()
  @ErrorHandler()
  update(@Body() bd: Update_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto, @Headers('authorization') hds) {
    return this.nomencla_CCM_Esp_Service.update( bd,hds);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Manifestacion Cultural Espec')
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The Manifestacion Cultural Espe .successfully deleted' })
  @ApiBody({
    type: Remove_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto,
  })  
  @Delete()
  @ErrorHandler()
  remove(@Body() remo: Remove_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto, @Headers('authorization')hds) {
    return this.nomencla_CCM_Esp_Service.remove(remo.id, hds);
  }


  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Mani Cultural Esp')  
  @ApiBody({
    description: 'se buca cualquiera manifestacion cult espe',
    type: Search_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto,
  })  
  @ApiCustomErrorResponse()
  @Put()
  search(@Body() query: Search_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto) {
    console.log(query)
    return this.nomencla_CCM_Esp_Service.search(query);
  }
}
