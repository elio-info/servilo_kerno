import { Module } from '@nestjs/common';
import { EntityModel, EntitySchema } from './infrastructure/entity.schema';
import { ErrorModule } from '../common/errors/error.module';
import { MunicipalityModel } from '../municipality/infrastructure/municipality.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EntityService } from './application/entity.service';
import { MongooseEntityRepository } from './infrastructure/mongoose-entity.repository';
import { EntityController } from './infrastructure/entity.controller';
import { TrazasModule } from 'src/cultura/trazas/trazas.module';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { EntityTypeModel } from '../entity_type/infrastructure/entity-type.schema';
import { PlaceModule } from '../place/place.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EntityModel.name, schema: EntitySchema },
    ]),
    
    ErrorModule,
    TrazasModule,
    MunicipalityModel,
    EntityTypeModel,
    PlaceModule,
  ],
  controllers: [EntityController],
  providers: [EntityService, MongooseEntityRepository, TrazasService],
  exports: [EntityService],
})
export class EntityModule {}
