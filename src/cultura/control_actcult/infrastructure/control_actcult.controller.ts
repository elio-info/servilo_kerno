import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Inject, Headers } from '@nestjs/common';
import { Control_ActividadCultural_Service } from './control_actcult.service';
import { Create_CActCult_Dto } from '../dto/create-control_actcult.dto';
import { Update_CActCult_Dto } from '../dto/update-control_actcult.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { Search_CActCult_Dto } from '../dto/search-control_actcult.dto';
import { Remove_CActCult_Dto } from '../dto/remove-control_actcult.dto';

@Controller('control-actcult')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@ApiTags('Control que se tiene de las Actividades Culturales')
export class Control_ActividadCultural_Controller {
  constructor(private readonly controlActcultService: Control_ActividadCultural_Service,
    @Inject(TrazasService) private traza:TrazasService
  ) {traza.trazaDTO.collection:'Control Actividad Cultural'}

  
  @Post()
  create(@Body() createControlActcultDto: Create_CActCult_Dto,@Headers('authorization') hds) {
     this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
          this.traza.trazaDTO.operation='save';
          this.traza.trazaDTO.error='Ok';
          this.traza.trazaDTO.before='';
          this.traza.trazaDTO.filter=createControlActcultDto
         
    return this.controlActcultService.create(createControlActcultDto, this.traza);
  }

  @Get()
  findAll() {
    return this.controlActcultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.controlActcultService.findOne(id);
  }

  
  @Patch()
  update( @Body() updateControlActcultDto: Update_CActCult_Dto, @Headers('authorization') hds) {
     this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
          this.traza.trazaDTO.operation='update';
          this.traza.trazaDTO.error='Ok';
         // this.traza.trazaDTO.before='';
          this.traza.trazaDTO.filter=updateControlActcultDto
         
    return this.controlActcultService.update( updateControlActcultDto, this.traza);
  }

  
  @Delete()
  remove(@Body() rm: Remove_CActCult_Dto, @Headers('authorization') hds) {
     this.traza.trazaDTO.user=getUserHTTP_JWTS(hds);
          this.traza.trazaDTO.operation='remove';
          this.traza.trazaDTO.error='Ok';
         // this.traza.trazaDTO.before='';
          this.traza.trazaDTO.filter=rm
         return this.controlActcultService.remove(rm,this.traza);
  }

  //TODO Making Search Endpoint By Query
      @ApiUnauthorizedCustomErrorResponse()
      @ApiNotFoundCustomErrorResponse('ProgramaSocial_Priorizado')
      @ApiBody({
        description: 'The key name for the search',
        type: Search_CActCult_Dto,
        required: true,
      })  
      @ApiCustomErrorResponse()
      @Put()
      @ErrorHandler()
      search(@Body() query:Search_CActCult_Dto) {
        console.log(query);    
        return this.controlActcultService.search(query);
      }
}
