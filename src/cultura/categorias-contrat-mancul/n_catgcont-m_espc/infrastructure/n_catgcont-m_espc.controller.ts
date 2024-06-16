import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { Nomencla_Categorias_ContratacionManifestacion_Especialidad_Service } from './n_catgcont-m_espc.service';
import { Create_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto } from '../dto/create-n_catgcont-m_espc.dto';
import { Update_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto } from '../dto/update-n_catgcont-m_espc.dto';
import { ApiTags } from '@nestjs/swagger';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('nomencla-categorias-contratacion-manifestacion-especialidad')
@ApiTags( 'Nomenclador de Categorias de Contratacion de Especialidad de Manifestacion Artistica')
export class Nomencla_Categorias_ContratacionManifestacion_Especialidad_Controller {
  constructor(private readonly nomencla_CCM_Esp_Service: 
    Nomencla_Categorias_ContratacionManifestacion_Especialidad_Service) {}

  @Post()
  create(@Body(new ValidationPipe()) create_nccm_esp_Dto: Create_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto) {
    this.nomencla_CCM_Esp_Service.create(create_nccm_esp_Dto);
    //return 
  }

  @Get()
  findAll(@Query() query:ExpressQuery) {
    return this.nomencla_CCM_Esp_Service.findAll();
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
    return this.nomencla_CCM_Esp_Service.findId(id);
  }

  @Get('/find/:name')
  findByName(@Param('name') name: string) {
    console.log(name)
    return this.nomencla_CCM_Esp_Service.findFirstName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) update_NCCM_Esp_Dto: Update_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto) {
    return this.nomencla_CCM_Esp_Service.update(id, update_NCCM_Esp_Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nomencla_CCM_Esp_Service.remove(id);
  }
}
