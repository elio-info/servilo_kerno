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
import { BankAccountService } from '../application/bank-account.service';
import { CreateBankAccountDto } from '../domain/dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../domain/dto/update-bank-account.dto';
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
import { BankAccount } from '../domain/entities/bank-account.entity';
import { DataList } from 'src/modules/common/data-list';
import { ApiCustomErrorResponse } from 'src/modules/common/doc/api-bad-request-custom-error-response.decorator';
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { ApiNotFoundCustomErrorResponse } from 'src/modules/common/doc/api-not-found-custom-error-response.decorator';
import SearchValidate from 'src/modules/common/pipes/SearchValidate.pipe';
import { SearchBankAccountDto } from '../domain/dto/search-bank-account.dto';

@ApiTags(`bank-account`)
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly service: BankAccountService) {}

  @ApiBody({
    description: 'The bank-account object',
    type: CreateBankAccountDto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
    description: 'Returns 201 when Bank Account is successfully created',
  })
  @ApiCustomErrorResponse()
  @Post()
  @ErrorHandler()
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.service.create(createBankAccountDto);
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
  @ApiPaginatedResponse(BankAccount)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @Get()
  @ErrorHandler()
  findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<DataList<BankAccount>> {
    return this.service.findAll(page, pageSize);
  }

  @ApiOkResponse({
    description: 'The bank-account object',
    type: BankAccount,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Bank Account')
  @ApiParam({ name: 'id' })
  @Get(':id')
  @ErrorHandler()
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOkResponse({
    description: 'The updated bank-account object',
    type: BankAccount,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Bank Account')
  @ApiBody({
    description: 'Send only the fields that you want to modify',
    type: CreateBankAccountDto,
  })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  @ErrorHandler()
  update(
    @Param('id') id: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.service.update(id, updateBankAccountDto);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Bank Account')
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The bank-account successfully deleted' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  @ErrorHandler()
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Bank Account')
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
  @UsePipes(new SearchValidate(SearchBankAccountDto))
  @Get('api/search')
  @ErrorHandler()
  search(@Query() query) {
    return this.service.search(query);
  }
}
