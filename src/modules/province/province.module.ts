import { Module } from '@nestjs/common';
import { ProvinceService } from './application/province.service';
import { ProvinceController } from './infrastructure/province.controller';
import { MongooseProvinceRepository } from './infrastructure/mongoose-province.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProvinceSchema,
  ProvinceModel,
} from './infrastructure/province.schema';
import { ErrorModule } from '../common/errors/error.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProvinceModel.name, schema: ProvinceSchema },
    ]),
    ErrorModule,
  ],
  controllers: [ProvinceController],
  providers: [ProvinceService, MongooseProvinceRepository],
})
export class ProvinceModule {}
