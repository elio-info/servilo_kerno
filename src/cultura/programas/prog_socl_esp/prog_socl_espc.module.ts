import { Module } from '@nestjs/common';
import { ProgramaSocial_Especial_Controller } from './infrastructure/prog_socl_espc.controller';
import { ProgramaSocial_Especial_Service } from './infrastructure/prog_socl_espc.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramaSocial_Especial, ProgramaSocial_Especial_Schema } from './schemas/prog_socl_espc.schema';

@Module({
  imports:[
    MongooseModule.forFeature(
      [
        {
          name:ProgramaSocial_Especial.name,
          schema:ProgramaSocial_Especial_Schema
        }
      ]
    )
  ],
  controllers: [ProgramaSocial_Especial_Controller],
  providers: [ProgramaSocial_Especial_Service],
})
export class ProgramaSocial_Especial_Module {}
