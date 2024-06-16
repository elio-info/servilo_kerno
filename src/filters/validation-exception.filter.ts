import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ValidationError } from 'class-validator';

import { Request, Response } from 'express';

@Catch(ValidationError)
export class ValidationExceptionFilter
  implements ExceptionFilter<ValidationError>
{
  constructor(private readonly configService: ConfigService) {}

  catch(exception: ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const res = {
      statusCode: 400,
      timestamp: Date.now(),
      path: request.url,
      message: Object.values(exception.constraints).join(', '),
      type: 'Validation Error',
    };

    response.status(400).json(res);
  }
}
