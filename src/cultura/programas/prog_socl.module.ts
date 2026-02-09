import { Module } from '@nestjs/common';
import { ProgramaSocial_Controller as ProgramaSocial_Controller } from './infrastructure/prog_socl.controller';
import { ProgramaSocial_Service as ProgramaSocial_Priorizado_Service } from './infrastructure/prog_socl.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramaSocial_Model, ProgramaSocial_Schema as ProgramaSocial_Schema } from './schemas/prog_socl.schema';

@Module({
  imports:[
    MongooseModule.forFeature(
      [
        {
          name:ProgramaSocial_Model.name,
          schema:ProgramaSocial_Schema
        }
      ]
    )
  ],
  controllers: [ProgramaSocial_Controller],
  providers: [ProgramaSocial_Priorizado_Service],
})
export class ProgramaSocial_Priorizado_Module {}
