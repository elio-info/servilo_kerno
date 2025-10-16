import { Module } from '@nestjs/common';
import { TrazasService } from './trazas.service';
import { TrazasController } from './trazas.controller';

@Module({
  controllers: [TrazasController],
  providers: [TrazasService],
  exports:[TrazasService]
})
export class TrazasModule {}
