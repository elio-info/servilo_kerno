import { Module } from '@nestjs/common';
import { Control_ActividadCultural_Service } from './infrastructure/control_actcult.service';
import { Control_ActividadCultural_Controller } from './infrastructure/control_actcult.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Control_ActividadCultural_Model, Control_ActividadCultural_Schema } from './schemas/control_actcult.schema';

@Module({
  imports:[
    MongooseModule.forFeature(
      [
        {
          name:Control_ActividadCultural_Model.name,
          schema:Control_ActividadCultural_Schema
        }
      ]
    )
  ],
  controllers: [Control_ActividadCultural_Controller],
  providers: [Control_ActividadCultural_Service]
})
export class Control_ActividadCultural_Module {}
