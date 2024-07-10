import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { Control_ActividadCultural_Service } from './control_actcult.service';
import { Create_Control_ActividadCultural_Dto } from '../dto/create-control_actcult.dto';
import { Update_Control_ActividadCultural_Dto } from '../dto/update-control_actcult.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

@Controller('control-actcult')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@ApiTags('Control que se tiene de las Actividades Culturales')
export class Control_ActividadCultural_Controller {
  constructor(private readonly controlActcultService: Control_ActividadCultural_Service) {}

  @Post()
  create(@Body( new ValidationPipe()) createControlActcultDto: Create_Control_ActividadCultural_Dto) {
    return this.controlActcultService.create(createControlActcultDto);
  }

  @Get()
  findAll() {
    return this.controlActcultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.controlActcultService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateControlActcultDto: Update_Control_ActividadCultural_Dto) {
    return this.controlActcultService.update(id, updateControlActcultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.controlActcultService.remove(id);
  }
}
