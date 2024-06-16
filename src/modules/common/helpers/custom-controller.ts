import { SetMetadata, applyDecorators } from '@nestjs/common';

export function CustomFunctionality(name: string): MethodDecorator {
  return function (
    _target: any,
    _propertyKey: string,
    _descriptor: PropertyDescriptor,
  ) {};
}

export function CustomController(...arr) {
  return applyDecorators(SetMetadata('rayray', 'ray'), (...arr) => {});
}
