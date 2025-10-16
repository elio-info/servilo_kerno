import { Module } from '@nestjs/common';
import { Nomencla_Categorias_ContratacionManifestacion_Especialidad_Controller } from './infrastructure/n_catgcont-m_espc.controller';
import { Nomencla_Categorias_ContratacionManifestacion_Especialidad_Service } from './infrastructure/n_catgcont-m_espc.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Nomencla_Categorias_ContratacionManifestacion_Especialidad, Nomencla_Categorias_ContratacionManifestacion_Especialidad_Schema } from './schemas/n_catgcont-m_espc.schema';

@Module({
  imports:[
    MongooseModule.forFeature(
      [
        {
          name:Nomencla_Categorias_ContratacionManifestacion_Especialidad.name,
          schema:Nomencla_Categorias_ContratacionManifestacion_Especialidad_Schema
        }
      ]
    )
  ],
  controllers: [Nomencla_Categorias_ContratacionManifestacion_Especialidad_Controller],
  providers: [Nomencla_Categorias_ContratacionManifestacion_Especialidad_Service],
})
export class Nomencla_Categorias_ContratacionManifestacion_Especialidad_Module {}
