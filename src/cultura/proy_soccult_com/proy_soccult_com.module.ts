import { Module } from '@nestjs/common';
import { Proyecto_Sociocultural_Comunitario_Service } from './proy_soccult_com.service';
import { Proyecto_Sociocultural_Comunitario_Controller } from './proy_soccult_com.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Proyecto_Sociocultural_Comunitario_Model, Proyecto_Sociocultural_Comunitario_Schema } from './schemas/proy_soccult_com.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:Proyecto_Sociocultural_Comunitario_Model.name,
      schema:Proyecto_Sociocultural_Comunitario_Schema
  }])],
  controllers: [Proyecto_Sociocultural_Comunitario_Controller],
  providers: [Proyecto_Sociocultural_Comunitario_Service]
})
export class Proyecto_Sociocultural_Comunitario_Module {}
