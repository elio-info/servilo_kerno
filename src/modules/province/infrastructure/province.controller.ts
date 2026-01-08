import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
} from '@nestjs/common';
import { ProvinceService } from '../application/province.service';
import { CreateProvinceDto } from '.././domain/dto/create-province.dto';
import { UpdateProvinceDto } from '.././domain/dto/update-province.dto';
import { ErrorHandler } from 'src/modules/common/errors/handler/error-handler.decorator';
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
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { ApiCustomErrorResponse } from 'src/modules/common/doc/api-bad-request-custom-error-response.decorator';
import { ProvinceEntity } from '../domain/entities/province.entity';
import { ApiPaginatedResponse } from 'src/modules/common/doc/api-paginated-response.decorator';
import { ApiNotFoundCustomErrorResponse } from 'src/modules/common/doc/api-not-found-custom-error-response.decorator';
import { SearchProvinceDto } from '../domain/dto/search-province.dto';
import { getUserHTTP_JWTS } from 'src/modules/common/extractors';

@ApiTags(`Province`)
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
// @UseInterceptors(GlobalInterceptor)
@Controller('province')
export class ProvinceController {
  constructor(private readonly service: ProvinceService) {}

  @ApiBody({
    description: 'The province object',
    type: CreateProvinceDto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
    description: 'Returns 201 when province is successfully created',
  })
  @ApiCustomErrorResponse()
  @ApiOperation({ summary:'Crear provincia'})
  @Post()
  @ErrorHandler()
  create(@Body() createProvinceDto: CreateProvinceDto,@Headers('authorization') hds) {
    let hds_uss= getUserHTTP_JWTS(hds);
    // console.log(hds_uss);       
    return this.service.create(createProvinceDto,hds);
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
  @ApiPaginatedResponse(ProvinceEntity)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @ApiOperation({ summary:'Recuperar todas las provincias'})
  @Get()
  @ErrorHandler()
  findAll(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    // console.log('all',page,pageSize);    
    return this.service.findAll(page, pageSize);
  }

  @ApiOkResponse({
    description: 'The province object',
    type: ProvinceEntity,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Province')
  @ApiParam({ name: 'id' })
  @Get(':id')
  @ErrorHandler()
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOkResponse({
    description: 'The updated Province Object',
    type: ProvinceEntity,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Province')
  @ApiBody({
    type: UpdateProvinceDto,
  })  
  @Patch()
  @ErrorHandler()
  update(    @Body() updateProvinceDto: UpdateProvinceDto,@Headers('authorization') hds ) {
    return this.service.update(updateProvinceDto,hds);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Province')
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The province successfully deleted' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  @ErrorHandler()
  remove(@Param('id') id: string,@Headers('authorization') hds) {
    console.log(getUserHTTP_JWTS(hds));
    
    return this.service.remove(id,hds);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Province')  
  @ApiBody({
    description: 'se buca a partir de : nombre de provincia, si buscas el nombre completo, si buscas borrados o no',
    type: SearchProvinceDto,
  })  
  @ApiCustomErrorResponse()
  // @UsePipes(new SearchValidate(SearchProvinceDto))
  @Post('search')
  @ErrorHandler()
  search(@Body() query:SearchProvinceDto ) {
    console.log(query);    
    return this.service.search(query);
  }
}
