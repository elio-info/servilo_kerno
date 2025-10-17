import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { ApiTags,ApiHeader,ApiBearerAuth } from '@nestjs/swagger';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ProgramaSocial_Especial_Service } from './prog_socl_espc.service';
import { Create_ProgramaSocial_Especial_Dto } from '../dto/create-prog_socl_espc.dto';
import { Update_ProgramaSocial_Especialidad_Dto } from '../dto/update-prog_socl_espc.dto';

@Controller('progsocl-especial')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@ApiTags( 'Programa Social Especial de Manifestacion Artistica')
export class ProgramaSocial_Especial_Controller {
  constructor(private readonly ps_Esp_Service: 
    ProgramaSocial_Especial_Service) {}

  @Post()
  create(@Body(new ValidationPipe()) create_ps_esp_Dto: Create_ProgramaSocial_Especial_Dto) {
  return  this.ps_Esp_Service.create(create_ps_esp_Dto);
    // 
  }

  @Get()
  findAll(@Query() query:ExpressQuery) {
    return this.ps_Esp_Service.findAll();
  }

  /* This code snippet is defining a GET endpoint in a NestJS controller. */
  @Get(':id')
  /*
   * The function findOne takes an id parameter and returns the first result found by calling the
   * findFirst method of the nomencla_Categorias_ContratacionManifestacionService.
   * @param {string} id - The `findOne` function takes a parameter `id` of type string. This function
   * is likely part of a service or controller in a Node.js application using a framework like NestJS.
   * The function is using the `id` parameter to call the `findFirst` method on the `nomencla_C
   * @returns The `First` `nomencla_Categorias_ContratacionManifestacionService`
   * being called with the `id` parameter passed to it, and the result of this method call
   * is being returned.
   */
  findById(@Param('id') id: string) {
    return this.ps_Esp_Service.findId(id);
  }

  @Get('/find/:name')
  findByName(@Param('name') name: string) {
    console.log(name)
    return this.ps_Esp_Service.findFirstName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) update_ps_Esp_Dto: Update_ProgramaSocial_Especialidad_Dto) {
    return this.ps_Esp_Service.update(id, update_ps_Esp_Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ps_Esp_Service.remove(id);
  }
}
