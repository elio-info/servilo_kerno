import { DuplicatedValueError } from '../duplicated-value.error';

export const DuplicationErrorHandler = (): MethodDecorator => {
  return (target, propertyName: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function errorHandler(...args) {
      try {
        const result = await originalMethod.apply(this, args);
      } catch (error) {
        if (error instanceof Error)
          throw new DuplicatedValueError(error.message);

        throw error;
      }
    };

    return descriptor;
  };
};
