import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Inject, Query, Put } from '@nestjs/common';
import { Comunidad_Transformacion_Service } from './comun_transf.service';
import { Create_Comunidad_Transformacion_Dto } from './dto/create-comun_transf.dto';
import { Update_Comunidad_Transformacion_Dto } from './dto/update-comun_transf.dto';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiUnauthorizedCustomErrorResponse } from 'src/modules/common/doc/api-unauthorized-custom-error-response.decorator';
import { ErrorHandler } from 'src/modules/common/errors/handler/error-handler.decorator';
import { TrazasService } from '../trazas/trazas.service';
import { getUserHTTP_JWTS, validatePagination } from 'src/modules/common/extractors';
import { Comunidad_Transformacion_Entity } from './schemas/comun_transf.entity';
import { Delete_Comunidad_Transformacion_Dto } from './dto/delete-comun_transf.dto';
import { Search_Comunidad_Transformacion_Dto } from './dto/search-comun_transf.dto';

@ApiTags('Comunidad en Transformacion')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@Controller('com-transf')
export class Comunidad_Transformacion_Controller {
  
  constructor(private readonly comtransfService: Comunidad_Transformacion_Service,
    @Inject(TrazasService) private traza:TrazasService
  ) {traza.trazaDTO.collection='Comunidad Transformacion'}

  @ApiUnauthorizedCustomErrorResponse()
  @ApiOkResponse({
    description:'Agregando Comunidad Transformacion',
    type: Comunidad_Transformacion_Entity 
  })
  @ApiBody({type:Create_Comunidad_Transformacion_Dto})
  @Post()
  @ErrorHandler()  
  create(@Body() createComTransDto: Create_Comunidad_Transformacion_Dto, @Headers('authorization') hds) {

    this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
    this.traza.trazaDTO.operation='save';
    this.traza.trazaDTO.error='Ok';
    this.traza.trazaDTO.before='';
    this.traza.trazaDTO.filter=createComTransDto
          
    return this.comtransfService.create(createComTransDto, this.traza);
  }

  @ApiQuery({
      name: 'page',
      description: 'The current page. 1 by default',
      type: 'number',
      required: false    
    })
  @ApiQuery({
    name: 'pageSize',
    description: 'The amount of items in the current page. 15 by default',
    type: 'number',
    required: false    
    })
  @Get()
  @ErrorHandler()
  findAll(@Query('page') page:number,@Query('pageSize') pageSize:number) {
    return this.comtransfService.findAll(validatePagination(page,1),validatePagination(pageSize,15));
  }

  @Get(':id')
  @ErrorHandler()
  findOne(@Param('id') id: string) {
    return this.comtransfService.findOne(id);
  }

  @ApiBody({type:Update_Comunidad_Transformacion_Dto})
  @ApiUnauthorizedCustomErrorResponse()
  @ApiOkResponse({
    description:'Agregando Comunidad Transformacion',
    type: Comunidad_Transformacion_Entity 
  })
  @Patch()
  @ErrorHandler()
  update( @Body() updateComTransDto: Update_Comunidad_Transformacion_Dto, @Headers('authorization') hds) {
     this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
    this.traza.trazaDTO.operation='update';
    this.traza.trazaDTO.error='Ok';
    this.traza.trazaDTO.before='';
    this.traza.trazaDTO.filter=updateComTransDto
    return this.comtransfService.update(updateComTransDto, this.traza);
  }

  @ApiBody({type:Delete_Comunidad_Transformacion_Dto})
  @ApiUnauthorizedCustomErrorResponse()
  @ApiOkResponse({
    description:'Agregando Comunidad Transformacion',
    type: Comunidad_Transformacion_Entity 
  })
  @Delete()
  @ErrorHandler()
  remove(@Body() rm: Delete_Comunidad_Transformacion_Dto, @Headers('authorization') hds) {
     this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
    this.traza.trazaDTO.operation='delete';
    this.traza.trazaDTO.error='Ok';
    this.traza.trazaDTO.before='';
    this.traza.trazaDTO.filter=rm
    return this.comtransfService.remove(rm.id, this.traza);
  }

 @ApiBody({type:Search_Comunidad_Transformacion_Dto})
  @ApiUnauthorizedCustomErrorResponse()  
  @Put()
  @ErrorHandler()
  search(@Body() srch: Search_Comunidad_Transformacion_Dto) {
    console.log(srch);    
    return this.comtransfService.search(srch);
  } 
}
