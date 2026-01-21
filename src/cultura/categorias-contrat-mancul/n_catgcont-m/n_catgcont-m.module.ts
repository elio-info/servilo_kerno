import { Module } from '@nestjs/common';
import { Nomencla_Categorias_ContratacionManifestacion_Controller } from './infrastructure/n_catgcont-m.controller';
import { NomenclaCategorias_ContratacionManifestacion_Service } from './infrastructure/n_catgcont-m.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NomenclaCategorias_ContratacionManifestacion_Model, NomenclaCategorias_ContratacionManifestacion_Schema } from './schemas/n_catgcont-m.schema';
import { TrazasModule } from 'src/cultura/trazas/trazas.module';
import { ErrorModule } from 'src/modules/common/errors/error.module';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

@Module({
  imports:[
    MongooseModule.forFeature(
      [
        {
          name:NomenclaCategorias_ContratacionManifestacion_Model.name,
          schema:NomenclaCategorias_ContratacionManifestacion_Schema
        }
      ]
    ),
    TrazasModule,
    ErrorModule
  ],
  controllers: [Nomencla_Categorias_ContratacionManifestacion_Controller],
  providers: [NomenclaCategorias_ContratacionManifestacion_Service,
    TrazasService
  ],
})
export class NomenclaCategorias_ContratacionManifestacion_Module {}
