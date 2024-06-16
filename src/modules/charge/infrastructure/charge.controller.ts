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
import { ChargeService } from '../application/charge.service';
import { CreateChargeDto } from '../domain/dto/create-charge.dto';
import { UpdateChargeDto } from '../domain/dto/update-charge.dto';
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
import { Charge } from '../domain/entities/charge.entity';
import { ApiPaginatedResponse } from '../../common/doc/api-paginated-response.decorator';
import { ApiNotFoundCustomErrorResponse } from '../../common/doc/api-not-found-custom-error-response.decorator';
import { CustomController } from 'src/modules/common/helpers/custom-controller';
import SearchValidate from 'src/modules/common/pipes/SearchValidate.pipe';
import { SearchChargeDto } from '../domain/dto/search-charge.dto';

const MODULE = 'Charge Module';
@ApiTags(`charge`)
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@Controller('charge')
export class ChargeController {
  constructor(private readonly chargeService: ChargeService) {}

  @ApiBody({
    description: 'The charge object',
    type: CreateChargeDto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
    description: 'Returns 201 when charge is successfully created',
  })
  @ApiCustomErrorResponse()
  @Post()
  @ErrorHandler()
  create(@Body() createChargeDto: CreateChargeDto) {
    return this.chargeService.create(createChargeDto);
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
  @ApiPaginatedResponse(Charge)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @Get()
  @ErrorHandler()
  findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 15) {
    return this.chargeService.findAll(page, pageSize);
  }

  @ApiOkResponse({
    description: 'The charge object',
    type: Charge,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Charge')
  @ApiParam({ name: 'id' })
  @Get(':id')
  @ErrorHandler()
  findOne(@Param('id') id: string) {
    return this.chargeService.findOne(id);
  }

  @ApiOkResponse({
    description: 'The updated Charge Object',
    type: Charge,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Charge')
  @ApiBody({
    type: CreateChargeDto,
  })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  @ErrorHandler()
  update(@Param('id') id: string, @Body() updateChargeDto: UpdateChargeDto) {
    return this.chargeService.update(id, updateChargeDto);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Charge')
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The charge successfully deleted' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  @ErrorHandler()
  remove(@Param('id') id: string) {
    return this.chargeService.remove(id);
  }
  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Charge')
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
  @UsePipes(new SearchValidate(SearchChargeDto))
  @Get('api/search')
  @ErrorHandler()
  search(@Query() query) {
    return this.chargeService.search(query);
  }
}
