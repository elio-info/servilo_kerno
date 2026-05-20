import {
  Controller,
  Get,
  Post,Put,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
  Inject,
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
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiUnauthorizedCustomErrorResponse } from '../../common/doc/api-unauthorized-custom-error-response.decorator';
import { ApiCustomErrorResponse } from '../../common/doc/api-bad-request-custom-error-response.decorator';
import { Charge_Entity } from '../domain/entities/charge.entity';
import { ApiPaginatedResponse } from '../../common/doc/api-paginated-response.decorator';
import { ApiNotFoundCustomErrorResponse } from '../../common/doc/api-not-found-custom-error-response.decorator';
import { CustomController } from 'src/modules/common/helpers/custom-controller';
import SearchValidate from 'src/modules/common/pipes/SearchValidate.pipe';
import { SearchChargeDto } from '../domain/dto/search-charge.dto';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { privateDecrypt } from 'crypto';
import { getUserHTTP_JWTS } from 'src/modules/common/extractors';
import { FindChargeDto } from '../domain/dto/find-charge.dto';
import { DeleteChargeDto } from '../domain/dto/delete-charge.dto';


@Controller('charge')
@ApiBearerAuth()
// 
@ApiTags(`Cargos de las personas`)
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})

export class ChargeController {
  private MODULE = 'Charge Module';
  constructor(
    private readonly chargeService: ChargeService,
    @Inject (TrazasService) private traza:TrazasService
  ) { traza.trazaDTO.collection=this.MODULE;}

  @ApiBody({
    description: 'The charge object',
    type: CreateChargeDto,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCreatedResponse({
    description: 'Returns 201 when charge is successfully created',
  })
  @ApiOperation({summary:'Crear cargo'})
  @ApiCustomErrorResponse()
  @Post()
  @ErrorHandler()
  create(@Body() createChargeDto: CreateChargeDto, @Headers('authorization') hds) {
    this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
    this.traza.trazaDTO.operation='save';
    this.traza.trazaDTO.error='Ok';
    this.traza.trazaDTO.before='';
    this.traza.trazaDTO.filter=createChargeDto
    return this.chargeService.create(createChargeDto, this.traza);
  }

  @ApiBody({
    type:FindChargeDto,
    required:true
  })
  @ApiPaginatedResponse(Charge_Entity)
  @ApiCustomErrorResponse('Invalid page or pageSize')
  @ApiUnauthorizedCustomErrorResponse()
  @ApiOperation({
    summary:'Todos los cargos',
    description:`
    Buscar todos: {}. Se devuelve paginacion por defecto con page:1 y pageSize:15;
    Buscar todos con limite: {page:X , pageSize:Y}. Se devuelve paginacion por defecto con page:1 y pageSize:15;
    Buscar un id: {id:""} poner pagina en la que se busca y la cantidad por pagina.NO PONER ATRIBUTOS DE PAGINACION`
  })
  @Put()
  @ErrorHandler()
  findAll(@Body() pages :FindChargeDto) {
    if (!!pages.id) {
      return this.chargeService.findOne(pages.id);
    } else {
      return this.chargeService.findAll(pages.page, pages.pageSize);
    }
    
  }
/*
  @ApiOkResponse({
    description: 'The charge object',
    type: Charge_Entity,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Charge')
  @ApiParam({ name: 'id',type:FindChargeDto })
  @Get(':id')
  @ErrorHandler()
  findOne(@Param('id') id: FindChargeDto) {
    return this.chargeService.findOne(id.id);
  }
  */

  @ApiOkResponse({
    description: 'The updated Charge Object',
    type: Charge_Entity,
  })
  @ApiUnauthorizedCustomErrorResponse()
  @ApiCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Charge')
  @ApiBody({
    type: UpdateChargeDto,required:true
  })
  @ApiOperation({ summary: 'Update el cargo' })
  @Patch()
  @ErrorHandler()
  update(@Body() updateChargeDto: UpdateChargeDto, @Headers('authorization') hds) {
     this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
    this.traza.trazaDTO.operation='update';
    this.traza.trazaDTO.error='Ok';
    // this.traza.trazaDTO.before='';
    this.traza.trazaDTO.filter=updateChargeDto;
    
    return this.chargeService.update( updateChargeDto, this.traza);
  }

  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Charge')
  @ApiCustomErrorResponse()
  @ApiOkResponse({ description: 'The charge successfully deleted' })
  @ApiBody({ type: DeleteChargeDto, required:true })
  @ApiOperation({
    summary: 'Eliminar cargo',
    description: 'The id for the remove'    
  })
  @Delete()
  @ErrorHandler()
  remove(@Body() rid: DeleteChargeDto,@Headers('authorization') hds) {
     this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
    this.traza.trazaDTO.operation='remove';
    this.traza.trazaDTO.error='Ok';
    // this.traza.trazaDTO.before='';
    this.traza.trazaDTO.filter=rid;
    return this.chargeService.remove(rid.id,this.traza);
  }


  @ApiUnauthorizedCustomErrorResponse()
  @ApiNotFoundCustomErrorResponse('Charge')
  @ApiBody({type:SearchChargeDto, required:true})
  @ApiOperation({summary:'Busca algo'})
  @ApiCustomErrorResponse()
  @Post('srch')
  @ErrorHandler()
  search(@Body() query:SearchChargeDto) {
    return this.chargeService.search(query);
  }
}
