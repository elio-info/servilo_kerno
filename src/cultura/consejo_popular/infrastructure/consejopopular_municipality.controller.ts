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
  Headers,
} from '@nestjs/common';
import { ErrorHandler } from 'src/modules/common/errors/handler/error-handler.decorator';
import { ConsejoPopular_Municipality_Service } from '../application/consejo_popular.service';
import { Create_ConsejoPopular_Municipality_Dto } from '../domain/dto/create-consejopopular_municipality.dto';
import { Update_ConsejoPopular_Municipality_Dto } from '../domain/dto/update-consejopopular_municipality.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { ApiCustomErrorResponse } from 'src/modules/common/doc/api-bad-request-custom-error-response.decorator';
import { ApiPaginatedResponse } from 'src/modules/common/doc/api-paginated-response.decorator';
import { ConsejoPopular_Municipality_Entity } from '../domain/schemas/consejo_popular.entity';
import { ApiNotFoundCustomErrorResponse } from 'src/modules/common/doc/api-not-found-custom-error-response.decorator';
import SearchValidate from 'src/modules/common/pipes/SearchValidate.pipe';
import SearchMunicipalityDto from '../domain/dto/search-consejopopular_municipality.dto';
import Search_ConsejoPopular_MunicipalityDto from '../domain/dto/search-consejopopular_municipality.dto';

@ApiTags(`Consejo Popular Municipal`)
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@Controller('consejopopular_municipality')
export class ConsejoPopular_Municipality_Controller {
  constructor(protected readonly service: ConsejoPopular_Municipality_Service) {}

  @ApiBody({
    description: 'The municipality object',
    type: Create_ConsejoPopular_Municipality_Dto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
    description: 'Returns 201 when municipality is successfully created',
  })
  @ApiCustomErrorResponse()
  @Post()
  @ErrorHandler()
  create(@Body() createCOMunicipalityDto: Create_ConsejoPopular_Municipality_Dto,@Headers('authorization') hds) {
    return this.service.create(createCOMunicipalityDto, hds);
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
  @ApiPaginatedResponse(ConsejoPopular_Municipality_Entity)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @Get()
  @ErrorHandler()
  findAll(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    return this.service.findAll(page, pageSize);
  }

  @ApiOkResponse({
    description: 'The municipality object',
    type: ConsejoPopular_Municipality_Entity,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Municipality')
  @ApiParam({ name: 'id' })
  @Get(':id')
  @ErrorHandler()
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOkResponse({
    description: 'The updated Municipality Object',
    type: ConsejoPopular_Municipality_Entity,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Municipality')
  @ApiBody({
    type: Create_ConsejoPopular_Municipality_Dto
  })
  @Patch()
  @ErrorHandler()
  update(
    @Body() updateCOMunicipalityDto: Update_ConsejoPopular_Municipality_Dto,
    @Headers('authorization') hds
  ) {
    return this.service.update( updateCOMunicipalityDto,hds);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('ConsejoPopular_Municipality')
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The Consejo Popular municipality successfully deleted' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  @ErrorHandler()
  remove(@Param('id') id: string, @Headers('authorization') hds) {
    return this.service.remove(id,hds);
  }

  //TODO Making Search Endpoint By Query
  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('ConsejoPopular_Municipality')
  @ApiBody({    
    type: Search_ConsejoPopular_MunicipalityDto
  })
  @ApiCustomErrorResponse()
 @Post('search')
  @ErrorHandler()
  search(@Query() query) {
    return this.service.search(query);
  }
}
