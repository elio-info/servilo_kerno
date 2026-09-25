import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Query, Put, Inject } from '@nestjs/common';
import { Proyecto_Sociocultural_Comunitario_Service } from './proy_soccult_com.service';
import { Create_Proyecto_Sociocultural_Comunitario_Dto } from './dto/create_proy_soccult_com.dto';
import { Update_Proyecto_Sociocultural_Comunitario_Dto } from './dto/update_proy_soccult_com.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiCustomErrorResponse } from 'src/modules/common/doc/api-bad-request-custom-error-response.decorator';
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { ErrorHandler } from 'src/modules/common/errors/handler/error-handler.decorator';
import { getUserHTTP_JWTS, validatePagination } from 'src/modules/common/extractors';
import { ConsejoPopular_Municipality_Entity } from '../consejo_popular/domain/schemas/consejo_popular.entity';
import { ApiPaginatedResponse } from 'src/modules/common/doc/api-paginated-response.decorator';
import { ApiNotFoundCustomErrorResponse } from 'src/modules/common/doc/api-not-found-custom-error-response.decorator';
import { Municipality } from 'src/modules/municipality/domain/entities/municipality.entity';
import { Proyecto_Sociocultural_Comunitario_Entity } from './schemas/proy_soccult_com.entity';
import { Search_Proyecto_Sociocultural_Comunitario_Dto } from './dto/search_proy_soccult_com.dto';
import { Remove_Proyecto_Sociocultural_Comunitario_Dto } from './dto/delete_proy_soccult_com.dto';
import { TrazasService } from '../trazas/trazas.service';
import { FindProyectoSocioculturalComunitarioDto } from './dto/find_proy_soccult_com.dto';

@ApiTags('Proyecto Sociocultural Comunitario')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@Controller('proy-soccult-com')
export class Proyecto_Sociocultural_Comunitario_Controller {
  constructor(private readonly proySoccultComService: Proyecto_Sociocultural_Comunitario_Service,
    @Inject(TrazasService) private traza:TrazasService
    )  { traza.trazaDTO.collection='Proyecto Sociocultural Comunitario'}

  @ApiBody({description:'Descripcion de un Proy Socl Comunitario',
    type:Create_Proyecto_Sociocultural_Comunitario_Dto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
      description: 'Returns 201 when proyecto sociocultural comunitario is successfully created',
    })
  @ApiCustomErrorResponse() 
  @ApiOperation({ summary: 'Create a new Proyecto Sociocultural Comunitario' }) 
  @Post()
  @ErrorHandler()
  create(@Body() createProySoccultComDto: Create_Proyecto_Sociocultural_Comunitario_Dto, @Headers('authorization') hds) {

    return this.proySoccultComService.create(createProySoccultComDto, hds);
  }
// Find all Proyecto Sociocultural Comunitario
  
  @ApiBody({ type: Proyecto_Sociocultural_Comunitario_Entity })
  @ApiOperation({
    summary:'todas las plantillas que se usaran en los proyectos socioculturales comunitarios',
    description: `
    Se definen las plantillas para usar en los proyectos socioculturales comunitarios.
    Buscar todos: {}. Se devuelve paginacion por defecto con page:1 y pageSize:15;
    Buscar todos con limite: {page:X , pageSize:Y}. Se devuelve paginacion por defecto con page:1 y pageSize:15;
    Buscar un id: {id:""} poner pagina en la que se busca y la cantidad por pagina.NO PONER ATRIBUTOS DE PAGINACION`,    
  })
  @ApiPaginatedResponse(Proyecto_Sociocultural_Comunitario_Entity)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @Put()
  @ErrorHandler()
  findAll(@Body() find: FindProyectoSocioculturalComunitarioDto) {
    return !!find && find.id ? 
    this.proySoccultComService.findOne(find.id) :
    this.proySoccultComService.findAll(validatePagination(find.page, 1), validatePagination(find.pageSize, 15));
  }
  /*

  @ApiOkResponse({
    description: 'The Proyecto_Sociocultural_Comunitario object',
    type: Proyecto_Sociocultural_Comunitario_Entity,
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
*/
// Update Proyecto Sociocultural Comunitario
  @ApiOkResponse({
    description: 'The updated Proyecto_Sociocultural_Comunitario Object',
    type: Proyecto_Sociocultural_Comunitario_Entity,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Proyecto_Sociocultural_Comunitario')
  @ApiBody({
    type: Update_Proyecto_Sociocultural_Comunitario_Dto,
  })
  @Patch()
  @ErrorHandler()
  update( @Body() updateProySoccultComDto: Update_Proyecto_Sociocultural_Comunitario_Dto , @Headers('authorization') hds) {
    return this.proySoccultComService.update( updateProySoccultComDto, hds);
  }

  // Delete Proyecto Sociocultural Comunitario
  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Proyecto_Sociocultural_Comunitario')
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The municipality successfully deleted' })
  @ApiBody({ type: Remove_Proyecto_Sociocultural_Comunitario_Dto })
  @Delete()
  @ErrorHandler()
  remove(@Body() rm: Remove_Proyecto_Sociocultural_Comunitario_Dto, @Headers('authorization') hds) {
    return this.proySoccultComService.remove(rm.id,hds);
  }

  //TODO Making Search Endpoint By Query
  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Proyecto_Sociocultural_Comunitario')
  @ApiBody({
    description: 'The key for the search',
    type: Search_Proyecto_Sociocultural_Comunitario_Dto,
    required: true,
  })  
  @ApiCustomErrorResponse()
  @Post('srch')
  @ErrorHandler()
  search(@Body() query: Search_Proyecto_Sociocultural_Comunitario_Dto) {
    console.log(query);    
    return this.proySoccultComService.search(query);
  }
}
