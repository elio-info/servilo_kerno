import { Module } from '@nestjs/common';
import { PlaceModel, PlaceSchema } from './infrastructure/place.schema';
import { ErrorModule } from '../common/errors/error.module';
import { MunicipalityModel } from '../municipality/infrastructure/municipality.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaceService } from './application/place.service';
import { MongoosePlaceRepository } from './infrastructure/mongoose-place.repository';
import { PlaceController } from './infrastructure/place.controller';
import { TrazasModule } from 'src/cultura/trazas/trazas.module';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlaceModel.name, schema: PlaceSchema },
    ]),
    TrazasModule,
    ErrorModule,
    MunicipalityModel,
  ],
  controllers: [PlaceController],
  providers: [PlaceService, MongoosePlaceRepository,TrazasService],
  exports: [PlaceService],
})
export class PlaceModule {}
