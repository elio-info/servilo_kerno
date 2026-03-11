import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({name:'IsAtLeastOnePlace2Insert_on', async:false})
export class IsAtLeastOnePlace2Insert_on implements ValidatorConstraintInterface{
    validate(places: string[], validationArguments?: ValidationArguments): Promise<boolean> | boolean {
      return (
        (places && places.length>0) || 
      (validationArguments.object['lugar_planificado'] || validationArguments.object['ic_planificado'] ||validationArguments.object['cp_planificado']) ||validationArguments.object['ct_planificado']
      )
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Descarado'
    }
}