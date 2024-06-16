import { Inject } from '@nestjs/common';
import { ErrorMapperService } from './error-mapper.service';

export const ErrorHandler = (): MethodDecorator => {
  const injectYourService = Inject(ErrorMapperService);
  return (target, propertyName: string, descriptor: PropertyDescriptor) => {
    injectYourService(target, 'mapper');
    const originalMethod = descriptor.value;
    descriptor.value = {
      [propertyName]: async function (...args) {
        try {
          const result = originalMethod.apply(this, args);
          return result instanceof Promise ? await result : result;
        } catch (error) {
          throw this.mapper.map(error);
        }
      },
    }[propertyName];

    return descriptor;
  };
};
