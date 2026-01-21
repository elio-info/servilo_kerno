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
  Put,
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
import { RemovePlaceDto } from '../domain/dto/remove-place.dto';

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
  create(@Body() createPlaceDto: CreatePlaceDto,@Headers('authorization') hds) {
    return this.service.create(createPlaceDto, hds);
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
  ) {
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
    type: UpdatePlaceDto,
  })
  @Patch()
  @ErrorHandler()
  update(@Body() updatePlaceDto: UpdatePlaceDto, @Headers('authorization') hds) {
    return this.service.update( updatePlaceDto, hds);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Place')
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The place successfully deleted' })
  @ApiBody({ type: RemovePlaceDto })
  @Delete()
  @ErrorHandler()
  remove(@Body() remo: RemovePlaceDto, @Headers('authorization') hds) {
    return this.service.remove(remo.id, hds);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Place')
  @ApiBody({    
    description: 'The value for the search',
    type: SearchPlaceDto,
    required: true,
  })
  @ApiCustomErrorResponse()
  @Put()
  @ErrorHandler()
  search(@Body() query) {
    return this.service.search(query);
  }
}
