import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, Headers, Put, Inject } from '@nestjs/common';
import { ProgramaSocial_Service as ProgramaSocial_Priorizado_Service } from './prog_socl.service';
import { ApiTags,ApiBearerAuth,ApiHeader, ApiBody, ApiCreatedResponse, ApiOperation, ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Create_ProgramaSocial_Dto as Create_ProgramaSocial_Dto } from '../dto/create-progsocl.dto';
import { Update_ProgramaSocial_Dto } from '../dto/update-progsocl.dto';
import { log } from 'console';
import { ApiCustomErrorResponse } from 'src/modules/common/doc/api-bad-request-custom-error-response.decorator';
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { ErrorHandler } from 'src/modules/common/errors/handler/error-handler.decorator';
import { ProgramaSocial_Entity } from '../schemas/prog_socl.entity';
import { ApiPaginatedResponse } from 'src/modules/common/doc/api-paginated-response.decorator';
import { getUserHTTP_JWTS, validatePagination } from 'src/modules/common/extractors';
import { ApiNotFoundCustomErrorResponse } from 'src/modules/common/doc/api-not-found-custom-error-response.decorator';
import { Remove_ProgramaSocial_Dto } from '../dto/remove-prog_socl.dto';
import { Search_ProgramaSocial_Dto } from '../dto/search-prog_socl.dto';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

@Controller('progsocl')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@ApiTags( 'Programa Social de Manifestacion Artistica')
export class ProgramaSocial_Controller {
  constructor(private readonly ps: 
    ProgramaSocial_Priorizado_Service,
    @Inject(TrazasService) private traza:TrazasService
  )  { traza.trazaDTO.collection='Programa Social'}

   @ApiBody({
    description: 'The Manifestacion Cultural object',
    type: Create_ProgramaSocial_Dto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
    description: 'Returns 201 when PS is successfully created',
  })
  @ApiCustomErrorResponse()
  @ApiOperation({ summary:'Crear PS Especial'})
  @Post()      
   @ErrorHandler()
       create(@Body() createProgramaSocial_Dto: Create_ProgramaSocial_Dto, @Headers('authorization') hds) {
      this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
      this.traza.trazaDTO.operation='save';
      this.traza.trazaDTO.error='Ok';
      this.traza.trazaDTO.before='';
      this.traza.trazaDTO.filter=createProgramaSocial_Dto
      return this.ps.create(createProgramaSocial_Dto, this.traza);
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
  @ApiPaginatedResponse(ProgramaSocial_Entity)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @ApiOperation({ summary:'Recuperar todas las categorias'})
  @Get()
  @ErrorHandler()    
  findAll(@Query('page') page:number,@Query('pageSize') pageSize:number) {
    return this.ps.findAll( validatePagination(page,1),validatePagination(pageSize,15));
  }

  @ApiOkResponse({
    description: 'The municipality object',
    type: ProgramaSocial_Entity,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('ProgramaSocial_Priorizado')
  @ApiParam({ name: 'id' })
  @Get(':id')
  @ErrorHandler()
  findById(@Param('id') id: string) {
    return this.ps.findId(id);
  }

  @ApiOkResponse({
    description: 'The updated Municipality Object',
    type: ProgramaSocial_Entity,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('ProgramaSocial_Priorizado')
  @ApiBody({
    type: Update_ProgramaSocial_Dto,
  })  
  @Patch()
  @ErrorHandler()
   update( @Body() updateProgramaSocialDto: Update_ProgramaSocial_Dto, @Headers('authorization') hds) {
    this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
    this.traza.trazaDTO.operation='update';
    this.traza.trazaDTO.error='Ok';
    //this.traza.trazaDTO.before='';
    this.traza.trazaDTO.filter=updateProgramaSocialDto
   return this.ps.update( updateProgramaSocialDto, this.traza);
  }

  @ApiUnauthorizedCustomErrorResponse()
    @ApiNotFoundCustomErrorResponse('ProgramaSocial_Priorizado')
    @ApiCustomErrorResponse()
    @ApiOkResponse({ description: 'The Prog Prio successfully deleted' })
    @ApiBody({
      type: Remove_ProgramaSocial_Dto,
    }) 
    @Delete()
    @ErrorHandler()
    remove(@Body('id') id: string, @Headers('authorization') hds) {
      this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
      this.traza.trazaDTO.operation='save';
      this.traza.trazaDTO.error='Ok';
      this.traza.trazaDTO.before='';
      this.traza.trazaDTO.filter={_id:id}
     return this.ps.remove(id, this.traza);
  }

  //TODO Making Search Endpoint By Query
    @ApiUnauthorizedCustomErrorResponse()
    @ApiNotFoundCustomErrorResponse('ProgramaSocial_Priorizado')
    @ApiBody({
      description: 'The key name for the search',
      type: Search_ProgramaSocial_Dto,
      required: true,
    })  
    @ApiCustomErrorResponse()
    @Put()
    @ErrorHandler()
    search(@Body() query:Search_ProgramaSocial_Dto) {
      console.log(query);    
      return this.ps.search(query);
    }
}
