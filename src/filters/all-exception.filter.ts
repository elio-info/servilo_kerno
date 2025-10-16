import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { ErrorMapperService } from '../modules/common/errors/handler/error-mapper.service';

@Catch()
export class AllExceptionFilter implements ExceptionFilter<any> {
  constructor(
    private readonly errorMapper: ErrorMapperService,
    private configService: ConfigService,
  ) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    exception = this.errorMapper.map(
      exception instanceof Error ? exception : null,
    );
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof Error ? exception.message : '';

    // const env = this.configService.get('NODE_ENV');
    // if (env !== 'production' && env !== 'test') {
    //   console.error(exception);
    // }

    const res = {
      statusCode: status,
      timestamp: Date.now(),
      path: request.url,
      message,
    };

    response.status(status).json(res);
  }
}
