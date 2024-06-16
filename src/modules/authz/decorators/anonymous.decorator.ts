import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const Anonymous = () => {
  return SetMetadata('anonymous', true);
};
//TODO-------- Working on dynamics role asignation
export function Roles() {
  return function (target, key, descriptor) {
    const original = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const metadata = await this.service.findAll();
      Reflect.defineMetadata('roles', 'rayfranc', this);
      return await original.apply(this, args);
    };
    return descriptor;
  };
}

/*export const SetCustomMetadata = <K = string, V = any>(
  metadataKey: K,
  metadataValue: V,
): CustomDecorator<K> => {
  const decoratorFactory = (target: object, key?: any, descriptor?: any) => {
    if (descriptor) {
      Reflect.defineMetadata(metadataKey, metadataValue, descriptor.value);
      return descriptor;
    }
    Reflect.defineMetadata(metadataKey, metadataValue, target);
    return target;
  };
  decoratorFactory.KEY = metadataKey;
  return decoratorFactory;
};*/
