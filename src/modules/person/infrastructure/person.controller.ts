import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ErrorHandler } from 'src/modules/common/errors/handler/error-handler.decorator';
import { PersonService } from '../application/person.service';
import { CreatePersonDto } from '../domain/dto/create-person.dto';
import { UpdatePersonDto } from '../domain/dto/update-person.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/modules/common/doc/api-paginated-response.decorator';
import { Person } from '../domain/entities/person.entity';
import { DataList } from 'src/modules/common/data-list';
import { ApiCustomErrorResponse } from 'src/modules/common/doc/api-bad-request-custom-error-response.decorator';
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { ApiNotFoundCustomErrorResponse } from 'src/modules/common/doc/api-not-found-custom-error-response.decorator';
import { Roles } from 'src/modules/authz/decorators/anonymous.decorator';
import { RolesGuard } from 'src/modules/authz/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomFileValidator } from 'src/modules/common/helpers/fileValidator';
import { PhotoDto } from '../domain/dto/photo.dto';
import SearchValidate from 'src/modules/common/pipes/SearchValidate.pipe';
import { SearchPersonDto } from '../domain/dto/seatch-person.dto';
import { plainToClass } from 'class-transformer';
import { SanitizePipe } from 'src/modules/common/pipes/Sanitize.pipe';

@ApiTags(`person`)
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@Controller('person')
export class PersonController {
  constructor(private readonly service: PersonService) {}

  @ApiBody({
    description: 'The person object',
    type: CreatePersonDto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
    description: 'Returns 201 when person is successfully created',
  })
  @ApiCustomErrorResponse()
  @Post()
  @ErrorHandler()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.service.create(createPersonDto);
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
  @ApiPaginatedResponse(Person)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @Get()
  //TODO Eliminar este Decorador de ROLES
  @Roles()
  @UseGuards(RolesGuard)
  @ErrorHandler()
  findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<DataList<Person>> {
    return this.service.findAll(page, pageSize);
  }

  @ApiOkResponse({
    description: 'The person object',
    type: Person,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Person')
  @ApiParam({ name: 'id' })
  @Get(':id')
  @ErrorHandler()
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiOkResponse({
    description: 'The updated Person Object',
    type: Person,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Person')
  @ApiBody({
    description: 'Send only the fields that you want to modify',
    type: CreatePersonDto,
  })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  @ErrorHandler()
  update(
    @Param('id') id: string,
    @Body(SanitizePipe) updatePersonDto: UpdatePersonDto,
  ) {
    const user = plainToClass(CreatePersonDto, updatePersonDto);
    return this.service.update(id, user);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Persons')
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The person successfully deleted' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  @ErrorHandler()
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Persons')
  @ApiBody({
    description: 'Send only the fields that you want to modify',
    type: PhotoDto,
  })
  //TODO Terminar endpoint de insertar Photo
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The person successfully deleted' })
  @ApiParam({ name: 'id' })
  @Post('photo/:id')
  @UseInterceptors(FileInterceptor('photo'))
  @ErrorHandler()
  postPhoto(
    @Param('id') id: string,
    @UploadedFile(CustomFileValidator()) photo: Express.Multer.File,
  ) {}
  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Province')
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
  @UsePipes(new SearchValidate(SearchPersonDto))
  @Get('api/search')
  @ErrorHandler()
  search(@Query() query) {
    return this.service.search(query);
  }
}
