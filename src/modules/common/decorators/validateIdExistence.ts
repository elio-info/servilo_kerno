import { ValidationOptions, isNotEmptyObject, registerDecorator } from 'class-validator';
import { Type } from '@nestjs/common';
import { IsRelationshipProvider } from '../helpers/customIdValidation';
/**
 * Chequea que que lo que se pase pertenezca a la tabla que se conecta
 * @param ModelClass :Schema Tabla a referenciar
 * @param options :[] de opciones a validar
 * @returns message error
 */
export const IsRelationShipWith =
  <TModel extends object>(
    ModelClass: Type<TModel>,
    options?: ValidationOptions,
  ) =>
  (object: object, propertyName: string) =>{  
    // console.log(object)  
    // console.log(ModelClass)
     registerDecorator({
      name: `IsRelationShip`,
      target: object.constructor,
      propertyName,
      options,
      constraints: [ModelClass],
      validator: IsRelationshipProvider,
    });
  }
   
