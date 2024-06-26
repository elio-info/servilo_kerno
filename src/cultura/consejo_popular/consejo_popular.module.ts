import { Module } from '@nestjs/common';
import { ConsejoPopular_Municipality_Service } from './application/consejo_popular.service';
import { ConsejoPopular_Municipality_Controller } from './infrastructure/consejopopular_municipality.controller';
import { Mongoose_ConsejoPopular_Municipality_Repository } from './infrastructure/mongoose-consejopopular_municipality.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ConsejoPopular_Municipality_Model,
  ConsejoPopular_Municipality_Schema,
} from './domain/schemas/consejo_popular.schema';
import { ErrorModule } from '../../modules/common/errors/error.module';
import { ProvinceModule } from '../../modules/province/province.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ConsejoPopular_Municipality_Model.name, schema: ConsejoPopular_Municipality_Schema },
    ]),
    ErrorModule,
    ProvinceModule,
  ],
  controllers: [ConsejoPopular_Municipality_Controller],
  providers: [ConsejoPopular_Municipality_Service, Mongoose_ConsejoPopular_Municipality_Repository],
})
export class ConsejoPopular_Municipality_Module {}
