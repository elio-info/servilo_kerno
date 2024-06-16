import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class SanitizePipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      if (value instanceof Object) {
        const parsedValue = Object.fromEntries(
          Object.entries(value).filter(([, v]) => v != null),
        );
        return parsedValue;
      }
      return value;
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}
