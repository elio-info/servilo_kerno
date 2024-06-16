import { Module } from '@nestjs/common';
import {
  BankAccountModel,
  BankAccountSchema,
} from './infrastructure/bank-account.schema';
import { ErrorModule } from '../common/errors/error.module';
import { MunicipalityModel } from '../municipality/infrastructure/municipality.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BankAccountService } from './application/bank-account.service';
import { MongooseBankAccountRepository } from './infrastructure/mongoose-bank-account.repository';
import { BankAccountController } from './infrastructure/bank-account.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BankAccountModel.name, schema: BankAccountSchema },
    ]),
    ErrorModule,
    MunicipalityModel,
  ],
  controllers: [BankAccountController],
  providers: [BankAccountService, MongooseBankAccountRepository],
  exports: [BankAccountService],
})
export class BankAccountModule {}
