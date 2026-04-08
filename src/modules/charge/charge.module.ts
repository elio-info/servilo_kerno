import { Module } from '@nestjs/common';
import { ChargeService } from './application/charge.service';
import { ChargeController } from './infrastructure/charge.controller';
import { MongooseChargeRepository } from './infrastructure/mongoose-charge.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ChargeSchema, ChargeModel } from './infrastructure/charge.schema';
import { ErrorModule } from '../common/errors/error.module';
import { TrazasModule } from 'src/cultura/trazas/trazas.module';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChargeModel.name, schema: ChargeSchema },
    ]),
    ErrorModule,
    TrazasModule
  ],
  controllers: [ChargeController],
  providers: [ChargeService, MongooseChargeRepository,
    TrazasService
  ],
})
export class ChargeModule {}
