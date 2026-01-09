import { Module } from '@nestjs/common';
import { Proyecto_Sociocultural_Comunitario_Service } from './proy_soccult_com.service';
import { Proyecto_Sociocultural_Comunitario_Controller } from './proy_soccult_com.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Proyecto_Sociocultural_Comunitario_Model, Proyecto_Sociocultural_Comunitario_Schema } from './schemas/proy_soccult_com.schema';
import { TrazasModule } from '../trazas/trazas.module';
import { TrazasService } from '../trazas/trazas.service';
import { ErrorModule } from 'src/modules/common/errors/error.module';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:Proyecto_Sociocultural_Comunitario_Model.name,
      schema:Proyecto_Sociocultural_Comunitario_Schema
  }]),
  TrazasModule,ErrorModule
],
  controllers: [Proyecto_Sociocultural_Comunitario_Controller],
  providers: [Proyecto_Sociocultural_Comunitario_Service,
    TrazasService
  ]
})
export class Proyecto_Sociocultural_Comunitario_Module {}
