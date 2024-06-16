import { Module } from '@nestjs/common';
import { PlaceModel, PlaceSchema } from './infrastructure/places.schema';
import { ErrorModule } from '../common/errors/error.module';
import { MunicipalityModel } from '../municipality/infrastructure/municipality.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaceService } from './application/place.service';
import { MongoosePlaceRepository } from './infrastructure/mongoose-place.repository';
import { PlaceController } from './infrastructure/place.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlaceModel.name, schema: PlaceSchema },
    ]),
    ErrorModule,
    MunicipalityModel,
  ],
  controllers: [PlaceController],
  providers: [PlaceService, MongoosePlaceRepository],
  exports: [PlaceService],
})
export class PlaceModule {}
