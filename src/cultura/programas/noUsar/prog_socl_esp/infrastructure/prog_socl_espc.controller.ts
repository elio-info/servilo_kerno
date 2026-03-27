import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, Headers, Put } from '@nestjs/common';
import { ApiTags,ApiHeader,ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ProgramaSocial_Especial_Service } from './prog_socl_espc.service';
import { Create_ProgramaSocial_Especial_Dto } from '../dto/create-prog_socl_espc.dto';
import { Update_ProgramaSocial_Especialidad_Dto } from '../dto/update-prog_socl_espc.dto';
import { ApiCustomErrorResponse } from 'src/modules/common/doc/api-bad-request-custom-error-response.decorator';
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { ErrorHandler } from 'src/modules/common/errors/handler/error-handler.decorator';
import { ProgramaSocial_Especial_Entity } from '../schemas/prog_socl_espc.entity';
import { validatePagination } from 'src/modules/common/extractors';
import { ApiPaginatedResponse } from 'src/modules/common/doc/api-paginated-response.decorator';
import { ApiNotFoundCustomErrorResponse } from 'src/modules/common/doc/api-not-found-custom-error-response.decorator';
import { Remove_ProgramaSocial_Especialidad_Dto } from '../dto/remove-prog_socl_espc.dto';
import { Search_ProgramaSocial_Especialidad_Dto } from '../dto/search-prog_socl_espc.dto';

@Controller('progsocl_especial')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@ApiTags( 'Programa Social Especial de Manifestacion Artistica')
export class ProgramaSocial_Especial_Controller {
  constructor(private readonly pse: 
    ProgramaSocial_Especial_Service) {}
/*
    
   @ApiBody({
      description: 'The Manifestacion Cultural object',
      type: Create_ProgramaSocial_Especial_Dto,
    })
    @ApiUnauthorizedCustomErrorResponse()
    @ApiCreatedResponse({
      description: 'Returns 201 when PS Especialidad is successfully created',
    })
    @ApiCustomErrorResponse()
    @ApiOperation({ summary:'Crear PS Especial'})
    @Post()
    @ErrorHandler()
   create(@Body() create_ps_esp_Dto: Create_ProgramaSocial_Especial_Dto,@Headers('authorization') hds) {
  return  this.pse.create(create_ps_esp_Dto,hds);    // 
  }

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
    @ApiPaginatedResponse(ProgramaSocial_Especial_Entity)
    @ApiCustomErrorResponse('Invalid page or pageSize')
    @ApiUnauthorizedCustomErrorResponse()
    @ApiOperation({ summary:'Recuperar todas las categorias'})
    @Get()
  findAll(@Query('page') page:number,@Query('pageSize') pageSize:number) {
    return this.pse.findAll(validatePagination(page,1),validatePagination(pageSize,15));
  }


  @ApiOkResponse({
      description: 'The municipality object',
      type: ProgramaSocial_Especial_Entity,
    })
    @ApiUnauthorizedCustomErrorResponse()
    @ApiCustomErrorResponse()
    @ApiNotFoundCustomErrorResponse('ProgramaSocial_Especial')
    @ApiParam({ name: 'id' })
    @Get(':id')
    @ErrorHandler()
    findById(@Param('id') id: string) {
    return this.pse.findId(id);
  }

 
  @ApiOkResponse({
     description: 'The updated Municipality Object',
     type: ProgramaSocial_Especial_Entity ,
   })
   @ApiUnauthorizedCustomErrorResponse()
   @ApiCustomErrorResponse()
   @ApiNotFoundCustomErrorResponse('Municipality')
   @ApiBody({
     type: Update_ProgramaSocial_Especialidad_Dto,
   })  
   @Patch()
   @ErrorHandler()
   update( @Body() update_ps_Esp_Dto: Update_ProgramaSocial_Especialidad_Dto, @Headers('authorization') hds) {
    return this.pse.update( update_ps_Esp_Dto, hds);
  }

 @ApiUnauthorizedCustomErrorResponse()
   @ApiNotFoundCustomErrorResponse('ProgramaSocial_Especial')
   @ApiCustomErrorResponse()
   @ApiOkResponse({ description: 'The pro esp successfully deleted' })
   @ApiBody({
     type: Remove_ProgramaSocial_Especialidad_Dto,
   }) 
   @Delete()
   @ErrorHandler()
    remove(@Param('id') id: string, @Headers('authorization') hds) {
    return this.pse.remove(id, hds);
  }

  //TODO Making Search Endpoint By Query
    @ApiUnauthorizedCustomErrorResponse()
    @ApiNotFoundCustomErrorResponse('ProgramaSocial_Especial')
    @ApiBody({
      description: 'The key name for the search',
      type: Search_ProgramaSocial_Especialidad_Dto,
      required: true,
    })  
    @ApiCustomErrorResponse()
    @Put()
    @ErrorHandler()
    search(@Body() query:Search_ProgramaSocial_Especialidad_Dto) {
      console.log(query);    
      return this.service.search(query);
    }
      */
}
