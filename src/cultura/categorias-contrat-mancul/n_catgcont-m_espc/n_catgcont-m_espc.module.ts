import { Module } from '@nestjs/common';
import { Nomencla_Categorias_ContratacionManifestacion_Especialidad_Controller as NomenclaCategorias_ContManifestacion_Especialidad_Controller } from './infrastructure/n_catgcont-m_espc.controller';
import { Nomencla_Categorias_ContratacionManifestacion_Especialidad_Service as NomenclaCategorias_ContManifestacion_Especialidad_Service } from './infrastructure/n_catgcont-m_espc.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NomenclaCategorias_ContManifestacion_Especialidad_Model as NomenclaCategorias_ContManifestacion_Especialidad_Model, NomenclaCategorias_ContManifestacion_Especialidad_Schema as NomenclaCategorias_ContManifestacion_Especialidad_Schema } from './schemas/n_catgcont-m_espc.schema';
import { TrazasModule } from 'src/cultura/trazas/trazas.module';
import { ErrorModule } from 'src/modules/common/errors/error.module';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

@Module({
  imports:[
    MongooseModule.forFeature(
      [
        {
          name:NomenclaCategorias_ContManifestacion_Especialidad_Model.name,
          schema:NomenclaCategorias_ContManifestacion_Especialidad_Schema
        }
      ]
    ),
    TrazasModule,
    ErrorModule
  ],
  controllers: [NomenclaCategorias_ContManifestacion_Especialidad_Controller],
  providers: [NomenclaCategorias_ContManifestacion_Especialidad_Service, TrazasService],
})
export class NomenclaCategorias_ContManifestacion_Especialidad_Module {}
