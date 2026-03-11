import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Inject, Headers, Put, Query } from '@nestjs/common';
import { Control_ActividadCultural_Service } from './control_actcult.service';
import { Create_CActCult_Dto } from '../dto/create-control_actcult.dto';
import { Update_CActCult_Dto } from '../dto/update-control_actcult.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { Search_CActCult_Dto } from '../dto/search-control_actcult.dto';
import { Remove_CActCult_Dto } from '../dto/remove-control_actcult.dto';
import { ApiCustomErrorResponse } from 'src/modules/common/doc/api-bad-request-custom-error-response.decorator';
import { ApiNotFoundCustomErrorResponse } from 'src/modules/common/doc/api-not-found-custom-error-response.decorator';
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { ErrorHandler } from 'src/modules/common/errors/handler/error-handler.decorator';
import { getUserHTTP_JWTS, validatePagination } from 'src/modules/common/extractors';
import { Control_ActividadCultural_Entity } from '../schemas/control_actcult.entity';
import { ApiPaginatedResponse } from 'src/modules/common/doc/api-paginated-response.decorator';

@Controller('control-actcult')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@ApiTags('Control que se tiene de las Actividades Culturales')
export class Control_ActividadCultural_Controller {
  constructor(private readonly controlActcultService: Control_ActividadCultural_Service,
    @Inject(TrazasService) private traza:TrazasService
  ) {traza.trazaDTO.collection='Control Actividad Cultural'}

  
  @ApiBody({
    description: 'The Actividad Cultural object',
    type: Create_CActCult_Dto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
    description: 'Returns 201 when Actividad is successfully created',
  })
  @ApiCustomErrorResponse()
  @ApiOperation({ summary:'Crear AC'})
  @Post()
  @ErrorHandler()
  create(@Body() createControlActcultDto: Create_CActCult_Dto,@Headers('authorization') hds) {
    console.log('entro', createControlActcultDto);
    
     this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
          this.traza.trazaDTO.operation='save';
          this.traza.trazaDTO.error='Ok';
          this.traza.trazaDTO.before='';
          this.traza.trazaDTO.filter=createControlActcultDto
         
    return this.controlActcultService.create(createControlActcultDto, this.traza);
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
  @ApiPaginatedResponse(Control_ActividadCultural_Entity)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @ApiOperation({ summary:'Recuperar todas las actividades'})
  @Get()
  @ErrorHandler()
    findAll(@Query('page') page:number,@Query('pageSize') pageSize:number) {
    return this.controlActcultService.findAll( validatePagination(page,1),validatePagination(pageSize,15));
  }

  @ApiOkResponse({
      description: 'The municipality object',
      type: Control_ActividadCultural_Entity,
    })
    @ApiUnauthorizedCustomErrorResponse()
    @ApiCustomErrorResponse()
    @ApiOperation({ summary:'Segun Id'})
    @ApiNotFoundCustomErrorResponse('ProgramaSocial_Priorizado')
    @ApiParam({ name: 'id' })
    @Get(':id')
    @ErrorHandler()
  findOne(@Param('id') id: string) {
    return this.controlActcultService.findOne(id);
  }

  
 @ApiOkResponse({
    description: 'The updated Municipality Object',
    type: Control_ActividadCultural_Entity
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('ProgramaSocial_Priorizado')
  @ApiBody({
    type: Update_CActCult_Dto,
  })  
  @Patch()
  @ErrorHandler()
  update( @Body() updateControlActcultDto: Update_CActCult_Dto, @Headers('authorization') hds) {
     this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
          this.traza.trazaDTO.operation='update';
          this.traza.trazaDTO.error='Ok';
         // this.traza.trazaDTO.before='';
          this.traza.trazaDTO.filter=updateControlActcultDto
         
    return this.controlActcultService.update( updateControlActcultDto, this.traza);
  }

  
  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('ProgramaSocial_Priorizado')
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The Prog Prio successfully deleted' })
  @ApiBody({
    type: Remove_CActCult_Dto,
  }) 
  @Delete()
  @ErrorHandler()
  remove(@Body() rm: Remove_CActCult_Dto, @Headers('authorization') hds) {
     this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
          this.traza.trazaDTO.operation='remove';
          this.traza.trazaDTO.error='Ok';
         // this.traza.trazaDTO.before='';
          this.traza.trazaDTO.filter=rm
         return this.controlActcultService.remove(rm.id,this.traza);
  }

  //TODO Making Search Endpoint By Query
  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('ProgramaSocial_Priorizado')
  @ApiBody({
    description: 'The key name for the search',
    type: Search_CActCult_Dto,
    required: true,
  }) 
  @ApiOperation({ summary:'Buscar por patron AC'}) 
  @ApiCustomErrorResponse()
  @Put()
  @ErrorHandler()
  search(@Body() query:Search_CActCult_Dto) {
    console.log(query);    
    return this.controlActcultService.search(query);
  }
}


