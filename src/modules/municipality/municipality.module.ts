import { Module } from '@nestjs/common';
import { MunicipalityService } from './application/municipality.service';
import { MunicipalityController } from './infrastructure/municipality.controller';
import { MongooseMunicipalityRepository } from './infrastructure/mongoose-municipality.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MunicipalityModel,
  MunicipalitySchema,
} from './infrastructure/municipality.schema';
import { ErrorModule } from '../common/errors/error.module';
import { ProvinceModule } from '../province/province.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MunicipalityModel.name, schema: MunicipalitySchema },
    ]),
    ErrorModule,
    ProvinceModule,
  ],
  controllers: [MunicipalityController],
  providers: [MunicipalityService, MongooseMunicipalityRepository],
})
export class MunicipalityModule {}
