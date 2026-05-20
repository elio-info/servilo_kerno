import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,  
  Inject,Headers,
  Put
} from '@nestjs/common';
import { CategorieService } from '../application/categorie.service';
import { CreateCategorieDto } from '../domain/dto/create-categorie.dto';
import { UpdateCategorieDto } from '../domain/dto/update-categorie.dto';
import { ErrorHandler } from '../../common/errors/handler/error-handler.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiUnauthorizedCustomErrorResponse } from '../../common/doc/api-unauthorized-custom-error-response.decorator';
import { ApiCustomErrorResponse } from '../../common/doc/api-bad-request-custom-error-response.decorator';
import { Categorie_Entity } from '../domain/entities/categorie.entity';
import { ApiPaginatedResponse } from '../../common/doc/api-paginated-response.decorator';
import { ApiNotFoundCustomErrorResponse } from '../../common/doc/api-not-found-custom-error-response.decorator';
import SearchValidate from 'src/modules/common/pipes/SearchValidate.pipe';
import { SearchCategorieDto } from '../domain/dto/search-categorie.dto';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { getUserHTTP_JWTS } from 'src/modules/common/extractors';
import { FindCategorieDto } from '../domain/dto/find-categorie.dto';
import { RemoveCategorieDto } from '../domain/dto/remove-categorie.dto';

@Controller('categorie')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@ApiTags(`Categorias de acceso`)
export class CategorieController {
  constructor(
    private readonly categorieService: CategorieService
    ,@Inject(TrazasService) private traza:TrazasService
    ){ traza.trazaDTO.collection='Categorias'}

  @ApiBody({
    description: 'The categorie object',
    type: CreateCategorieDto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
    description: 'Returns 201 when categorie is successfully created',
  })
  @ApiCustomErrorResponse()
  @ApiOperation({summary:"Crear categoria de acceso"})
  @Post()
  @ErrorHandler()
  create(@Body() createCategorieDto: CreateCategorieDto, @Headers('authorization') hds) {
      this.traza.trazaDTO.operation='Crear categoria de acceso';
      this.traza.trazaDTO.user=getUserHTTP_JWTS (hds);
      this.traza.trazaDTO.error='Ok';
      this.traza.trazaDTO.filter=createCategorieDto;
      this.traza.trazaDTO.before={};
    return this.categorieService.create(createCategorieDto, this.traza);
  }

  @ApiBody({type:FindCategorieDto,required:true})
  @ApiOperation({
    summary:'todas las categorias que se usaran en los cargos',
    description: `
    Se definen las plantillas para usar en los cargos
    Buscar todos: {}. Se devuelve paginacion por defecto con page:1 y pageSize:15;
    Buscar todos con limite: {page:X , pageSize:Y}. Se devuelve paginacion por defecto con page:1 y pageSize:15;
    Buscar un id: {id:""} poner pagina en la que se busca y la cantidad por pagina.NO PONER ATRIBUTOS DE PAGINACION`,    
  })
  @ApiPaginatedResponse(Categorie_Entity)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @Put()
  @ErrorHandler()
  findAll(@Body() find:FindCategorieDto) {

    return !!find.id? 
      this.categorieService.findOne(find.id): 
      this.categorieService.findAll(find.page, find.pageSize)
      ;
  }
/*
  @ApiOkResponse({
    description: 'The categorie object',
    type: Categorie_Entity,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Categorie')
  @ApiParam({ name: 'id' })
  @Get(':id')
  @ErrorHandler()
  findOne(@Param('id') id: string) {
    return this.categorieService.findOne(id);
  }
*/

  @ApiOkResponse({
    description: 'The updated Categorie Object',
    type: Categorie_Entity,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Categorie')
  @ApiBody({
    type: UpdateCategorieDto,
  })
  @ApiOperation({summary:'Actuallizar la plantilla de una categoria'})
  @Patch()
  @ErrorHandler()
  update(    
    @Body() updateCategorieDto: UpdateCategorieDto,
    @Headers('authorization') hds
  ) {
    this.traza.trazaDTO.operation='Crear categoria de acceso';
      this.traza.trazaDTO.user=getUserHTTP_JWTS (hds);
      this.traza.trazaDTO.error='Ok';
      this.traza.trazaDTO.filter=updateCategorieDto;
      this.traza.trazaDTO.before={};
    return this.categorieService.update( updateCategorieDto,this.traza);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Categorie')
  @ApiCustomErrorResponse()
  @ApiOperation({
    summary: 'Eliminar categorias',
    description: 'The id for the remove'    
  })
  @ApiOkResponse({ description: 'The categorie successfully deleted' })
  @Delete()
  @ErrorHandler()
  remove(@Body() rid: RemoveCategorieDto, @Headers('authorization') hds) {
    this.traza.trazaDTO.operation='Crear categoria de acceso';
      this.traza.trazaDTO.user=getUserHTTP_JWTS (hds);
      this.traza.trazaDTO.error='Ok';
      this.traza.trazaDTO.filter={id:rid};
      this.traza.trazaDTO.before={};
    return this.categorieService.remove(rid.id,this.traza);
  }

  
  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Place')
  @ApiBody({
    type: SearchCategorieDto,
    required: true,
  })
  @ApiOperation({
    summary: 'Buscar por motivos',
    description: 'The values for the search'    
  })
  @ApiCustomErrorResponse()
  @Post('srch')
  @ErrorHandler()
  search(@Body() query:SearchCategorieDto) {
    return this.categorieService.search(query);
  }
}
