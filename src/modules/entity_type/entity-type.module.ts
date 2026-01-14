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
import { TrazasModule } from 'src/cultura/trazas/trazas.module';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EntityTypeModel.name, schema: EntityTypeSchema },
    ]),
    TrazasModule,
    ErrorModule,
  ],
  controllers: [EntityTypeController],
  providers: [EntityTypeService, MongooseEntityTypeRepository,TrazasService],
})
export class EntityTypeModule {}
