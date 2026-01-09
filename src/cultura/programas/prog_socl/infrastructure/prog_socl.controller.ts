import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query } from '@nestjs/common';
import { ProgramaSocial_Service } from './prog_socl.service';
import { ApiTags,ApiBearerAuth,ApiHeader } from '@nestjs/swagger';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Create_ProgramaSocial_Dto } from '../dto/create-prog_socl.dto';
import { Update_ProgramaSocial_Dto } from '../dto/update-prog_socl.dto';
import { log } from 'console';

@Controller('prog-social')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer theJsonWebToken',
})
@ApiBearerAuth()
@ApiTags( 'Programa Social de Manifestacion Artistica')
export class ProgramaSocial_Controller {
  constructor(private readonly ProgramaSocialService: 
    ProgramaSocial_Service) {}

  @Post()
  create(@Body(new ValidationPipe()) createProgramaSocial_Dto: Create_ProgramaSocial_Dto) {
    return this.ProgramaSocialService.create(createProgramaSocial_Dto);
  }

  @Get()
  findAll(@Query() query:ExpressQuery) {
    return this.ProgramaSocialService.findAll();
  }

  /* This code snippet is defining a GET endpoint in a NestJS controller. */
  @Get(':id')  
  findById(@Param('id') id: string) {
    return this.ProgramaSocialService.findId(id);
  }

  @Get('/find/:name')
  findByName(@Param('name') name: string) {
    console.log(name);
    return this.ProgramaSocialService.findFirstName(name);    
     
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) updateProgramaSocialDto: Update_ProgramaSocial_Dto) {
    return this.ProgramaSocialService.update(id, updateProgramaSocialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ProgramaSocialService.remove(id);
  }
}
