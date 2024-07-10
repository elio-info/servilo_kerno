import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { Proyecto_Sociocultural_Comunitario_Service } from './proy_soccult_com.service';
import { Create_Proyecto_Sociocultural_Comunitario_Dto } from './dto/create-proy_soccult_com.dto';
import { Update_Proyecto_Sociocultural_Comunitario_Dto } from './dto/update-proy_soccult_com.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('Proyecto Sociocultural Comunitario')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@Controller('proy-soccult-com')
export class Proyecto_Sociocultural_Comunitario_Controller {
  constructor(private readonly proySoccultComService: Proyecto_Sociocultural_Comunitario_Service) {}

  @Post()
  create(@Body(new ValidationPipe()) createProySoccultComDto: Create_Proyecto_Sociocultural_Comunitario_Dto) {
    return this.proySoccultComService.create(createProySoccultComDto);
  }

  @Get()
  findAll() {
    return this.proySoccultComService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proySoccultComService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProySoccultComDto: Update_Proyecto_Sociocultural_Comunitario_Dto) {
    return this.proySoccultComService.update(id, updateProySoccultComDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proySoccultComService.remove(id);
  }
}
