import { Module } from '@nestjs/common';
import { EntityModel, EntitySchema } from './infrastructure/entity.schema';
import { ErrorModule } from '../common/errors/error.module';
import { MunicipalityModel } from '../municipality/infrastructure/municipality.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EntityService } from './application/entity.service';
import { MongooseEntityRepository } from './infrastructure/mongoose-entity.repository';
import { EntityController } from './infrastructure/entity.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EntityModel.name, schema: EntitySchema },
    ]),
    ErrorModule,
    MunicipalityModel,
  ],
  controllers: [EntityController],
  providers: [EntityService, MongooseEntityRepository],
  exports: [EntityService],
})
export class EntityModule {}
