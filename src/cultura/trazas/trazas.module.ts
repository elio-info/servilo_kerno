import { Module } from '@nestjs/common';
import {  TrazasService } from './trazas.service';
import { TrazasController } from './trazas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TrazaClass, TrazaSchema } from './trazas.schema';
import { ErrorModule } from 'src/modules/common/errors/error.module';

@Module({
  // imports:[
  //     MongooseModule.forFeature([
  //       {
  //         name: TrazaClass.name,schema:TrazaSchema
  //       }
  //     ])
  //     , ErrorModule
  // ],
  controllers: [TrazasController],
  providers: [TrazasService],
  exports:[TrazasService]//,MongooseModule
})
export class TrazasModule {}
