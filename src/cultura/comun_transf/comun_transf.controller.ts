import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { Comunidad_Transformacion_Service } from './comun_transf.service';
import { Create_Comunidad_Transformacion_Dto } from './dto/create-comun_transf.dto';
import { Update_Comunidad_Transformacion_Dto } from './dto/update-comun_transf.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('Comunidad en Transformacion')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@Controller('com-transf')
export class Comunidad_Transformacion_Controller {
  constructor(private readonly comtransfService: Comunidad_Transformacion_Service) {}

  @Post()
  create(@Body(new ValidationPipe()) createComTransDto: Create_Comunidad_Transformacion_Dto) {
    return this.comtransfService.create(createComTransDto);
  }

  @Get()
  findAll() {
    return this.comtransfService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comtransfService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComTransDto: Update_Comunidad_Transformacion_Dto) {
    return this.comtransfService.update(id, updateComTransDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comtransfService.remove(id);
  }
}
