import { Module } from '@nestjs/common';
import { Comunidad_Transformacion_Service } from './comun_transf.service';
import { Comunidad_Transformacion_Controller } from './comun_transf.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comunidad_Transformacion_Model, Comunidad_Transformacion_Schema } from './schemas/comun_transf.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:Comunidad_Transformacion_Model.name,
      schema:Comunidad_Transformacion_Schema
  }])],
  controllers: [Comunidad_Transformacion_Controller],
  providers: [Comunidad_Transformacion_Service]
})
export class Comunidad_Transformacion_Module {}
