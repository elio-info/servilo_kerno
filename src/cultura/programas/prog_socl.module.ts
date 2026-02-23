import { Module } from '@nestjs/common';
import { ProgramaSocial_Controller as ProgramaSocial_Controller } from './infrastructure/prog_socl.controller';
import { ProgramaSocial_Service as ProgramaSocial_Service } from './infrastructure/prog_socl.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramaSocial_Model, ProgramaSocial_Schema as ProgramaSocial_Schema } from './schemas/prog_socl.schema';
import { ErrorModule } from 'src/modules/common/errors/error.module';
import { TrazasModule } from '../trazas/trazas.module';
import { TrazasService } from '../trazas/trazas.service';

@Module({
  imports:[
    MongooseModule.forFeature(
      [
        {
          name:ProgramaSocial_Model.name,
          schema:ProgramaSocial_Schema
        }
      ]
    ),
    ErrorModule,
    TrazasModule
  ],
  controllers: [ProgramaSocial_Controller],
  providers: [ProgramaSocial_Service, TrazasService],
})
export class ProgramaSocial_Module {}
