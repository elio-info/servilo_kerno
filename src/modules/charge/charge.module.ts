import { Module } from '@nestjs/common';
import { ChargeService } from './application/charge.service';
import { ChargeController } from './infrastructure/charge.controller';
import { MongooseChargeRepository } from './infrastructure/mongoose-charge.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ChargeSchema, ChargeModel } from './infrastructure/charge.schema';
import { ErrorModule } from '../common/errors/error.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChargeModel.name, schema: ChargeSchema },
    ]),
    ErrorModule,
  ],
  controllers: [ChargeController],
  providers: [ChargeService, MongooseChargeRepository],
})
export class ChargeModule {}
