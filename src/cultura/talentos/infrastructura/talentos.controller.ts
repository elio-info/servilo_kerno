import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Talento_Artistico_Service } from './talentos.service';
import { Create_Talento_Artistico_Dto } from '../dto/create-talentos.dto';
import { Update_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto } from 'src/cultura/categorias-contrat-mancul/n_catgcont-m_espc/dto/update-n_catgcont-m_espc.dto';
import { Query as ExpressQuery} from 'express-serve-static-core'
import { Update_Talento_Artistico_Dto } from '../dto/update-talentos.dto';

@Controller('talentos')
@ApiTags('Talentos Artisticos y de Apoyo')
export class Talento_Artistico_Controller {
    constructor(
        private readonly talento_Srv:Talento_Artistico_Service
    ){}

    @Post()
  create(@Body(new ValidationPipe()) create_talento_Dto: Create_Talento_Artistico_Dto): void {
    this.talento_Srv.create(create_talento_Dto);
    //return 
  }

  @Get()
  findAll(@Query() query:ExpressQuery): any {
    return this.talento_Srv.findAll();
  }

  /* This code snippet is defining a GET endpoint in a NestJS controller. 
  @Get(':id')  
  findById(@Param('id') id: string) {
    return this.talento_Srv.findId(id);
  }*/

  @Get('/find/:name')
  findByName(@Param('name') name: string) {
    console.log(name)
    return this.talento_Srv.findByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(new ValidationPipe()) talento_Dto: Update_Talento_Artistico_Dto) {
    return this.talento_Srv.update(id, talento_Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talento_Srv.remove(id);
  }
}
