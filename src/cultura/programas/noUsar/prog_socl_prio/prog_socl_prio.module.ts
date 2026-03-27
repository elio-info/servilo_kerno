import { Module } from '@nestjs/common';
import { ProgramaSocial_Priorizado_Controller as ProgramaSocial_Priorizado_Controller } from './infrastructure/prog_socl.controller';
import { ProgramaSocial_Service as ProgramaSocial_Priorizado_Service } from './infrastructure/prog_socl.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramaSocial_Priorizado_Model, ProgramaSocial_Priorizado_Schema as ProgramaSocial_Priorizado_Schema } from './schemas/prog_socl_prio.schema';

@Module({
  imports:[
    MongooseModule.forFeature(
      [
        {
          name:ProgramaSocial_Priorizado_Model.name,
          schema:ProgramaSocial_Priorizado_Schema
        }
      ]
    )
  ],
  controllers: [ProgramaSocial_Priorizado_Controller],
  providers: [ProgramaSocial_Priorizado_Service],
})
export class ProgramaSocial_Priorizado_Module {}
