import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, Headers, Put } from '@nestjs/common';
import { ProgramaSocial_Service as ProgramaSocial_Priorizado_Service } from './prog_socl.service';
import { ApiTags,ApiBearerAuth,ApiHeader, ApiBody, ApiCreatedResponse, ApiOperation, ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Create_ProgramaSocial_Priorizado_Dto } from '../dto/create-progsocl_prio.dto';
import { Update_ProgramaSocial_Priorizado_Dto } from '../dto/update-progsocl_prio.dto';
import { log } from 'console';
import { ApiCustomErrorResponse } from 'src/modules/common/doc/api-bad-request-custom-error-response.decorator';
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { ErrorHandler } from 'src/modules/common/errors/handler/error-handler.decorator';
import { ProgramaSocial_Priorizado_Entity } from '../schemas/prog_socl_prio.entity';
import { ApiPaginatedResponse } from 'src/modules/common/doc/api-paginated-response.decorator';
import { validatePagination } from 'src/modules/common/extractors';
import { ApiNotFoundCustomErrorResponse } from 'src/modules/common/doc/api-not-found-custom-error-response.decorator';
import { Remove_ProgramaSocial_Priorizado_Dto } from '../dto/remove-prog_socl_prio.dto';
import { Search_ProgramaSocial_Priorizado_Dto } from '../dto/search-prog_socl_prio.dto';

@Controller('progsocl_priorizado')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@ApiTags( 'Programa Social piorizado de Manifestacion Artistica')
export class ProgramaSocial_Priorizado_Controller {
  constructor(private readonly psp: 
    ProgramaSocial_Priorizado_Service) {}
/*
   @ApiBody({
        description: 'The Manifestacion Cultural object',
        type: Create_ProgramaSocial_Priorizado_Dto,
      })
      @ApiUnauthorizedCustomErrorResponse()
      @ApiCreatedResponse({
        description: 'Returns 201 when PS Especialidad is successfully created',
      })
      @ApiCustomErrorResponse()
      @ApiOperation({ summary:'Crear PS Especial'})
      @Post()
      @ErrorHandler()
    create(@Body() createProgramaSocial_Dto: Create_ProgramaSocial_Priorizado_Dto, @Headers('authorization') hds) {
    return this.psp.create(createProgramaSocial_Dto, hds);
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
    @ApiPaginatedResponse(ProgramaSocial_Priorizado_Entity)
    @ApiCustomErrorResponse('Invalid page or pageSize')
    @ApiUnauthorizedCustomErrorResponse()
    @ApiOperation({ summary:'Recuperar todas las categorias'})
    @Get()
  findAll(@Query('page') page:number,@Query('pageSize') pageSize:number) {
    return this.psp.findAll( validatePagination(page,1),validatePagination(pageSize,15));
  }

  @ApiOkResponse({
      description: 'The municipality object',
      type: ProgramaSocial_Priorizado_Entity,
    })
    @ApiUnauthorizedCustomErrorResponse()
    @ApiCustomErrorResponse()
    @ApiNotFoundCustomErrorResponse('ProgramaSocial_Priorizado')
    @ApiParam({ name: 'id' })
    @Get(':id')
    @ErrorHandler()
    findById(@Param('id') id: string) {
    return this.psp.findId(id);
  }

   @ApiOkResponse({
      description: 'The updated Municipality Object',
      type: ProgramaSocial_Priorizado_Entity,
    })
    @ApiUnauthorizedCustomErrorResponse()
    @ApiCustomErrorResponse()
    @ApiNotFoundCustomErrorResponse('ProgramaSocial_Priorizado')
    @ApiBody({
      type: Update_ProgramaSocial_Priorizado_Dto,
    })  
    @Patch()
    @ErrorHandler()
   update( @Body() updateProgramaSocialDto: Update_ProgramaSocial_Priorizado_Dto, @Headers('authorization') hds) {
    return this.psp.update( updateProgramaSocialDto, hds);
  }

  @ApiUnauthorizedCustomErrorResponse()
    @ApiNotFoundCustomErrorResponse('ProgramaSocial_Priorizado')
    @ApiCustomErrorResponse()
    @ApiOkResponse({ description: 'The Prog Prio successfully deleted' })
    @ApiBody({
      type: Remove_ProgramaSocial_Priorizado_Dto,
    }) 
    @Delete()
    @ErrorHandler()
    remove(@Body('id') id: string, @Headers('authorization') hds) {
    return this.psp.remove(id, hds);
  }

  //TODO Making Search Endpoint By Query
    @ApiUnauthorizedCustomErrorResponse()
    @ApiNotFoundCustomErrorResponse('ProgramaSocial_Priorizado')
    @ApiBody({
      description: 'The key name for the search',
      type: Search_ProgramaSocial_Priorizado_Dto,
      required: true,
    })  
    @ApiCustomErrorResponse()
    @Put()
    @ErrorHandler()
    search(@Body() query:Search_ProgramaSocial_Priorizado_Dto) {
      console.log(query);    
      return this.service.search(query);
    }
      */
}
