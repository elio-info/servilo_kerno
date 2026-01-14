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
import { EntityTypeService } from '../application/entity-type.service';
import { CreateEntityTypeDto } from '../domain/dto/create-entity-type.dto';
import { UpdateEntityTypeDto } from '../domain/dto/update-entity-type.dto';
import { ErrorHandler } from '../../common/errors/handler/error-handler.decorator';
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
import { ApiUnauthorizedCustomErrorResponse } from '../../common/doc/api-unauthorized-custom-error-response.decorator';
import { ApiCustomErrorResponse } from '../../common/doc/api-bad-request-custom-error-response.decorator';
import { EntityType } from '../domain/entities/entity-type.entity';
import { ApiPaginatedResponse } from '../../common/doc/api-paginated-response.decorator';
import { ApiNotFoundCustomErrorResponse } from '../../common/doc/api-not-found-custom-error-response.decorator';
import SearchValidate from 'src/modules/common/pipes/SearchValidate.pipe';
import { SearchEntityTypeDto } from '../domain/dto/search-entity-type.dto';
import { SanitizePipe } from 'src/modules/common/pipes/Sanitize.pipe';
import { RemoveEntityTypeDto } from '../domain/dto/remove-entity-type.dto';

@ApiTags(`entity-type`)
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@Controller('entity-type')
export class EntityTypeController {
  constructor(private readonly entTypeService: EntityTypeService) {}

  @ApiBody({
    description: 'The entity type object',
    type: CreateEntityTypeDto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
    description: 'Returns 201 when entity type is successfully created',
  })
  @ApiCustomErrorResponse()
  @Post()
  @ErrorHandler()
  create(@Body() createEntityTypeDto: CreateEntityTypeDto, @Headers('authorization') hds) {
    return this.entTypeService.create(createEntityTypeDto, hds);
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
  @ApiPaginatedResponse(EntityType)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @Get()
  @ErrorHandler()
  findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 15) {
    return this.entTypeService.findAll(page, pageSize);
  }

  @ApiOkResponse({
    description: 'The entity type object',
    type: EntityType,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Entity Type')
  @ApiParam({ name: 'id' })
  @Get(':id')
  @ErrorHandler()
  findOne(@Param('id') id: string) {
    return this.entTypeService.findOne(id);
  }

  @ApiOkResponse({
    description: 'The updated Entity Type Object',
    type: EntityType,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Entity Type')
  @ApiBody({
    type: CreateEntityTypeDto,
  })
  @Patch()
  @ErrorHandler()
  update(
    @Headers('authorization') hds,
    @Body(SanitizePipe) updateEntityTypeDto: UpdateEntityTypeDto,
  ) {
    return this.entTypeService.update( updateEntityTypeDto,hds);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Entity Type')
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The entity type successfully deleted' })
  @Delete()
  @ErrorHandler()
  remove(@Body() remo: RemoveEntityTypeDto, @Headers('authorization') hds) {
    return this.entTypeService.remove(remo.id,hds);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Entity Type')
  @ApiBody({
      description: 'The key for the search',
    type: SearchEntityTypeDto,
    required: false,
  })
  @ApiCustomErrorResponse()
  @Put()
  @ErrorHandler()
  search(@Body() query) {
    return this.entTypeService.search(query);
  }
}
