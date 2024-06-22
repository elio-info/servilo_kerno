import { ValidationOptions, registerDecorator } from 'class-validator';
import { Type } from '@nestjs/common';
import { IsRelationshipProvider } from '../helpers/customIdValidation';

export const IsRelationShipWith =
  <TModel extends object>(
    ModelClass: Type<TModel>,
    options?: ValidationOptions,
  ) =>
  (object: object, propertyName: string) =>{

    console.log(object,propertyName)
     registerDecorator({
      name: `IsRelationShip`,
      target: object.constructor,
      propertyName,
      options,
      constraints: [ModelClass],
      validator: IsRelationshipProvider,
    });
  }
   
