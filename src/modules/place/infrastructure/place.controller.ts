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
} from '@nestjs/common';
import { ErrorHandler } from 'src/modules/common/errors/handler/error-handler.decorator';
import { PlaceService } from '../application/place.service';
import { CreatePlaceDto } from '../domain/dto/create-place.dto';
import { UpdatePlaceDto } from '../domain/dto/update-place.dto';
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
import { ApiPaginatedResponse } from 'src/modules/common/doc/api-paginated-response.decorator';
import { DataList } from 'src/modules/common/data-list';
import { ApiCustomErrorResponse } from 'src/modules/common/doc/api-bad-request-custom-error-response.decorator';
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { ApiNotFoundCustomErrorResponse } from 'src/modules/common/doc/api-not-found-custom-error-response.decorator';
import { Place } from '../domain/entities/place.entity';
import SearchValidate from 'src/modules/common/pipes/SearchValidate.pipe';
import { SearchPlaceDto } from '../domain/dto/search-place.dto';

@ApiTags(`place`)
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@Controller('place')
export class PlaceController {
  constructor(private readonly service: PlaceService) {}

  @ApiBody({
    description: 'The place object',
    type: CreatePlaceDto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
    description: 'Returns 201 when the place object is successfully created',
  })
  @ApiCustomErrorResponse()
  @Post()
  @ErrorHandler()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.service.create(createPlaceDto);
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
  @ApiPaginatedResponse(Place)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @Get()
  @ErrorHandler()
  findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<DataList<Place>> {
    return this.service.findAll(page, pageSize);
  }

  @ApiOkResponse({
    description: 'The person object',
    type: Place,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Place')
  @ApiParam({ name: 'id' })
  @Get(':id')
  @ErrorHandler()
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOkResponse({
    description: 'The updated Place Object',
    type: Place,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Place')
  @ApiBody({
    type: CreatePlaceDto,
  })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  @ErrorHandler()
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.service.update(id, updatePlaceDto);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Place')
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The place successfully deleted' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  @ErrorHandler()
  remove(@Param('id') id: string) {
    return this.service.remove(id);
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
  @UsePipes(new SearchValidate(SearchPlaceDto))
  @Get('api/search')
  @ErrorHandler()
  search(@Query() query) {
    return this.service.search(query);
  }
}
