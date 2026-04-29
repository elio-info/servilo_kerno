import { Module } from '@nestjs/common';
import { PersonModel, PersonSchema } from './infrastructure/person.schema';
import { ErrorModule } from '../common/errors/error.module';
import { MunicipalityModel } from '../municipality/infrastructure/municipality.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonService } from './application/person.service';
import { MongoosePersonRepository } from './infrastructure/mongoose-person.repository';
import { PersonController } from './infrastructure/person.controller';
import { TrazasModule } from 'src/cultura/trazas/trazas.module';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PersonModel.name, schema: PersonSchema },
    ]),
    ErrorModule,
    TrazasModule,
    MunicipalityModel,
  ],
  controllers: [PersonController],
  providers: [PersonService, MongoosePersonRepository, TrazasService],
  exports: [PersonService],
})
export class PersonModule {}
