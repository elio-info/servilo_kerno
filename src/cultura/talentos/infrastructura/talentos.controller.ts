import { Body, Controller, Delete, Get, Headers, Inject, Param, Patch, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiHeader,ApiBearerAuth, ApiParam, ApiBody, ApiCreatedResponse, ApiOperation, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Talento_Artistico_Service } from './talentos.service';
import { Create_Talento_Artistico_Dto } from '../dto/create-talentos.dto';
import { Update_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto } from 'src/cultura/categorias-contrat-mancul/n_catgcont-m_espc/dto/update-n_catgcont-m_espc.dto';
import { Query as ExpressQuery} from 'express-serve-static-core'
import { Update_Talento_Artistico_Dto } from '../dto/update-talentos.dto';
import { Talento_Artistico_Entity } from '../schemas/talentos.entity';
import { ApiCustomErrorResponse } from 'src/modules/common/doc/api-bad-request-custom-error-response.decorator';
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { ErrorHandler } from 'src/modules/common/errors/handler/error-handler.decorator';
import { Remove_Talento_Artistico_Dto } from '../dto/remove-talentos.dto';
import { Search_Talentos_Artisticos_Dto } from '../dto/search-talentos.dto';
import { ApiNotFoundCustomErrorResponse } from 'src/modules/common/doc/api-not-found-custom-error-response.decorator';
import { ApiPaginatedResponse } from 'src/modules/common/doc/api-paginated-response.decorator';
import { getUserHTTP_JWTS, validatePagination } from 'src/modules/common/extractors';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

@Controller('talentos')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@ApiTags('Talentos Artisticos y de Apoyo')
export class Talento_Artistico_Controller {
    constructor(
        private readonly talento_Srv:Talento_Artistico_Service,
        @Inject(TrazasService) private traza:TrazasService
    ){ traza.trazaDTO.collection='Talentos'}

    @ApiBody({
      description: 'The Manifestacion Cultural object',
      type: Create_Talento_Artistico_Dto,
    })
    @ApiUnauthorizedCustomErrorResponse()
    @ApiCreatedResponse({
      description: 'Returns 201 when PS Especialidad is successfully created',
    })
    @ApiCustomErrorResponse()
    @ApiOperation({ summary:'Crear PS Especial'})
    @Post()
    @ErrorHandler()
    create(@Body() create_talento_Dto: Create_Talento_Artistico_Dto, @Headers('authorization') hds) {
     this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
      this.traza.trazaDTO.operation='save';
      this.traza.trazaDTO.error='Ok';
      this.traza.trazaDTO.before='';
      this.traza.trazaDTO.filter=create_talento_Dto
      return this.talento_Srv.create(create_talento_Dto, this.traza);
    // 
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
    @ApiPaginatedResponse(Talento_Artistico_Entity)
    @ApiCustomErrorResponse('Invalid page or pageSize')
    @ApiUnauthorizedCustomErrorResponse()
    @ApiOperation({ summary:'Recuperar todas las categorias'})
    @Get()
  findAll(@Query('page') pg:number,@Query('pageSize')pgSz:number) {
    return this.talento_Srv.findAll( validatePagination(pg,1),validatePagination(pgSz,15));
  }

 @ApiOkResponse({
     description: 'The municipality object',
     type: Talento_Artistico_Entity,
   })
   @ApiUnauthorizedCustomErrorResponse()
   @ApiCustomErrorResponse()
   @ApiNotFoundCustomErrorResponse('talentos_y_apoyos')
   @ApiParam({ name: 'id' })
   @Get(':id')
   @ErrorHandler()
    findById(@Param('id') id: string) {
    return this.talento_Srv.findId(id);
  }

   @ApiOkResponse({
      description: 'The updated Municipality Object',
      type: Talento_Artistico_Entity,
    })
    @ApiUnauthorizedCustomErrorResponse()
    @ApiCustomErrorResponse()
    @ApiNotFoundCustomErrorResponse('talentos_y_apoyos')
    @ApiBody({
      type: Update_Talento_Artistico_Dto,
    })  
    @Patch()
    @ErrorHandler()
   update( @Body() talento_Dto: Update_Talento_Artistico_Dto, @Headers('authorization')  hds)  {
     this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
    this.traza.trazaDTO.operation='update';
    this.traza.trazaDTO.error='Ok';
    this.traza.trazaDTO.filter=talento_Dto
    return this.talento_Srv.update( talento_Dto, hds);
  }

  @ApiUnauthorizedCustomErrorResponse()
    @ApiNotFoundCustomErrorResponse('talentos_y_apoyos')
    @ApiCustomErrorResponse()
    @ApiOkResponse({ description: 'The talento successfully deleted' })
    @ApiBody({
      type: Remove_Talento_Artistico_Dto,
    }) 
    @Delete()
    @ErrorHandler()
    remove(@Body('id') id: string, @Headers('authorization') hds) {
      this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
      this.traza.trazaDTO.operation='save';
      this.traza.trazaDTO.error='Ok';
      // this.traza.trazaDTO.before='';
      this.traza.trazaDTO.filter={_id:id}
           
    return this.talento_Srv.remove(id, this.traza);
  }

  //TODO Making Search Endpoint By Query
    @ApiUnauthorizedCustomErrorResponse()
    @ApiNotFoundCustomErrorResponse('talentos_y_apoyos')
    @ApiBody({
      description: 'The key name for the search',
      type: Search_Talentos_Artisticos_Dto,
      required: true,
    })  
    @ApiCustomErrorResponse()
    @Put()
    @ErrorHandler()
    search(@Body() query:Search_Talentos_Artisticos_Dto) {
      console.log(query);    
      return this.talento_Srv.search(query);
    }
}
