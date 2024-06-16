import { Module } from '@nestjs/common';
import { CategorieService } from './application/categorie.service';
import { CategorieController } from './infrastructure/categorie.controller';
import { MongooseCategorieRepository } from './infrastructure/mongoose-categorie.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CategorieSchema,
  CategorieModel,
} from './infrastructure/categorie.schema';
import { ErrorModule } from '../common/errors/error.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategorieModel.name, schema: CategorieSchema },
    ]),
    ErrorModule,
  ],
  controllers: [CategorieController],
  providers: [CategorieService, MongooseCategorieRepository],
})
export class CategorieModule {}
