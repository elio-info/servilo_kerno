import { Module } from '@nestjs/common';
import { EntityTypeService as EntityTypeService } from './application/entity-type.service';
import { EntityTypeController as EntityTypeController } from './infrastructure/entity-type.controller';
import { MongooseEntityTypeRepository as MongooseEntityTypeRepository } from './infrastructure/mongoose-entity-type.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EntityTypeSchema,
  EntityTypeModel,
} from './infrastructure/entity-type.schema';
import { ErrorModule } from '../common/errors/error.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EntityTypeModel.name, schema: EntityTypeSchema },
    ]),
    ErrorModule,
  ],
  controllers: [EntityTypeController],
  providers: [EntityTypeService, MongooseEntityTypeRepository],
})
export class EntityTypeModule {}
