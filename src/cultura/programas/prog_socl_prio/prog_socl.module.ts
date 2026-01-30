import { Module } from '@nestjs/common';
import { ProgramaSocial_Controller } from './infrastructure/prog_socl.controller';
import { ProgramaSocial_Service } from './infrastructure/prog_socl.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramaSocial_Priorizado, ProgramaSocial_Schema } from './schemas/prog_socl.schema';

@Module({
  imports:[
    MongooseModule.forFeature(
      [
        {
          name:ProgramaSocial_Priorizado.name,
          schema:ProgramaSocial_Schema
        }
      ]
    )
  ],
  controllers: [ProgramaSocial_Controller],
  providers: [ProgramaSocial_Service],
})
export class ProgramaSocial_Module {}
