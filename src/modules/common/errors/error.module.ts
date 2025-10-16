import { Module } from '@nestjs/common';
import { ErrorMapperService } from './handler/error-mapper.service';

@Module({
  providers: [ErrorMapperService],
  exports: [ErrorMapperService],
})
export class ErrorModule {}
