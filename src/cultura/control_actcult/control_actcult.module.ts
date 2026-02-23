import { Module } from '@nestjs/common';
import { Control_ActividadCultural_Service } from './infrastructure/control_actcult.service';
import { Control_ActividadCultural_Controller } from './infrastructure/control_actcult.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Control_ActividadCultural_Model, Control_ActividadCultural_Schema } from './schemas/control_actcult.schema';
import { TrazasService } from '../trazas/trazas.service';
import { ErrorModule } from 'src/modules/common/errors/error.module';
import { TrazasModule } from '../trazas/trazas.module';
import { EntityModule } from 'src/modules/entity/entity.module';
import { PlaceModule } from 'src/modules/place/place.module';
import { Talento_Artistico_Module } from '../talentos/talentos.module';
import { ProgramaSocial_Module } from '../programas/prog_socl.module';

@Module({
  imports:[
    MongooseModule.forFeature(
      [
        {
          name:Control_ActividadCultural_Model.name,
          schema:Control_ActividadCultural_Schema
        }
      ]
    ),
    ErrorModule,TrazasModule,
    EntityModule,
    PlaceModule,
    Talento_Artistico_Module,
    ProgramaSocial_Module
  ],
  controllers: [Control_ActividadCultural_Controller],
  providers: [Control_ActividadCultural_Service, TrazasService]
})
export class Control_ActividadCultural_Module {}
