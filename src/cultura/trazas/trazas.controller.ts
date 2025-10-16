import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrazasService } from './trazas.service';
import { CreateTrazaDto } from './dto/create-traza.dto';
import { UpdateTrazaDto } from './dto/update-traza.dto';

@Controller('trazas')
export class TrazasController {
  constructor(private readonly trazasService: TrazasService) {}

  @Post()
  create(@Body() createTrazaDto: CreateTrazaDto) {
    return this.trazasService.create(createTrazaDto);
  }

  @Get()
  findAll() {
    return this.trazasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trazasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrazaDto: UpdateTrazaDto) {
    return this.trazasService.update(+id, updateTrazaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trazasService.remove(+id);
  }
}
