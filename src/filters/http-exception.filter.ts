import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  constructor(private readonly configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const res = {
      statusCode: status,
      timestamp: Date.now(),
      path: request.url,
      message: exception.getResponse()['message'],
      correlationId:
        request.headers['x-correlation-id'] ||
        request.headers['X-CORRELATION-ID'],
    };
    response.status(status).json(res);
  }
}
