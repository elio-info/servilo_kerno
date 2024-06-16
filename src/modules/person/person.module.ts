import { Module } from '@nestjs/common';
import { PersonModel, PersonSchema } from './infrastructure/person.schema';
import { ErrorModule } from '../common/errors/error.module';
import { MunicipalityModel } from '../municipality/infrastructure/municipality.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonService } from './application/person.service';
import { MongoosePersonRepository } from './infrastructure/mongoose-person.repository';
import { PersonController } from './infrastructure/person.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PersonModel.name, schema: PersonSchema },
    ]),
    ErrorModule,
    MunicipalityModel,
  ],
  controllers: [PersonController],
  providers: [PersonService, MongoosePersonRepository],
  exports: [PersonService],
})
export class PersonModule {}
