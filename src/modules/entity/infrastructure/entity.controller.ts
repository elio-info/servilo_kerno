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
  Put,
} from '@nestjs/common';
import { ErrorHandler } from 'src/modules/common/errors/handler/error-handler.decorator';
import { EntityService } from '../application/entity.service';
import { CreateEntityDto } from '../domain/dto/create-entity.dto';
import { UpdateEntityDto } from '../domain/dto/update-entity.dto';
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
import { Entity_Entity } from '../domain/entities/entity.entity';
import { DataList } from 'src/modules/common/data-list';
import { ApiCustomErrorResponse } from 'src/modules/common/doc/api-bad-request-custom-error-response.decorator';
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { ApiNotFoundCustomErrorResponse } from 'src/modules/common/doc/api-not-found-custom-error-response.decorator';
import SearchValidate from 'src/modules/common/pipes/SearchValidate.pipe';
import { SearchEntityDto } from '../domain/dto/search-entity.dto';
import { SanitizePipe } from 'src/modules/common/pipes/Sanitize.pipe';
import { RemoveEntityDto } from '../domain/dto/remove-entity.dto';

@ApiTags(`entity`)
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@Controller('entity')
export class EntityController {
  constructor(private readonly service: EntityService) {}

  @ApiBody({
    description: 'The entity object',
    type: CreateEntityDto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
    description: 'Returns 201 when entity is successfully created',
  })
  @ApiCustomErrorResponse()
  @Post()
  @ErrorHandler()
  create(@Body() createEntityDto: CreateEntityDto,@Headers('authorization') hds) {
    return this.service.create(createEntityDto,hds);
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
  @ApiPaginatedResponse(Entity_Entity)
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
    description: 'The entity object',
    type: Entity_Entity,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Entity')
  @ApiParam({ name: 'id' })
  @Get(':id')
  @ErrorHandler()
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOkResponse({
    description: 'The updated Entity Object',
    type: Entity_Entity,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Entity')
  @ApiBody({
    description: 'Send only the fields that you want to modify',
    type: UpdateEntityDto,
  })
  @Patch()
  @ErrorHandler()
  update(
   @Body() updateEntityDto: UpdateEntityDto,@Headers('authorization') hds
  ) {
    return this.service.update( updateEntityDto,hds);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Entity')
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The Entity successfully deleted' })
  @ApiBody({ type: RemoveEntityDto })
  @Delete()
  @ErrorHandler()
  remove(@Body() rmid: RemoveEntityDto,@Headers('authorization') hds) {
    return this.service.remove(rmid.id,hds);
  }


  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Entity')
  @ApiBody({
    type: SearchEntityDto,
    required: true,
    description:'Para buscar'
  })
  @ApiCustomErrorResponse()
  @Put()
  @ErrorHandler()
  search(@Body() query:SearchEntityDto) {
    return this.service.search(query);
  }
}
