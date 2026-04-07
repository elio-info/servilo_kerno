import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  Inject,Headers
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
    return this.categorieService.create(createCategorieDto);
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
  @ApiPaginatedResponse(Categorie_Entity)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @Get()
  @ErrorHandler()
  findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 15) {
    return this.categorieService.findAll(page, pageSize);
  }

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

  @ApiOkResponse({
    description: 'The updated Categorie Object',
    type: Categorie_Entity,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Categorie')
  @ApiBody({
    type: CreateCategorieDto,
  })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  @ErrorHandler()
  update(
    @Param('id') id: string,
    @Body() updateCategorieDto: UpdateCategorieDto,
  ) {
    return this.categorieService.update(id, updateCategorieDto);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Categorie')
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The categorie successfully deleted' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  @ErrorHandler()
  remove(@Param('id') id: string) {
    return this.categorieService.remove(id);
  }
  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Place')
  @ApiQuery({
    name: 'key',
    description: 'The key name for the search',
    type: 'string',
    required: false,
  })
  @ApiQuery({
    name: 'value',
    description: 'The value for the search',
    type: 'string',
    required: false,
  })
  @ApiCustomErrorResponse()
  @UsePipes(new SearchValidate(SearchCategorieDto))
  @Get('api/search')
  @ErrorHandler()
  search(@Query() query) {
    return this.categorieService.search(query);
  }
}
