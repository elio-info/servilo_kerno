import { Module } from '@nestjs/common';
import { Comunidad_Transformacion_Service } from './comun_transf.service';
import { Comunidad_Transformacion_Controller } from './comun_transf.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comunidad_Transformacion_Model, Comunidad_Transformacion_Schema } from './schemas/comun_transf.schema';
import { ErrorModule } from 'src/modules/common/errors/error.module';
import { TrazasModule } from '../trazas/trazas.module';
import { TrazasService } from '../trazas/trazas.service';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:Comunidad_Transformacion_Model.name,
      schema:Comunidad_Transformacion_Schema
  }]),
ErrorModule,TrazasModule,],
  controllers: [Comunidad_Transformacion_Controller],
  providers: [Comunidad_Transformacion_Service , TrazasService]
})
export class Comunidad_Transformacion_Module {}
