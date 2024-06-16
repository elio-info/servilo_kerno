import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Connection } from 'mongoose';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsRelationshipProvider implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private readonly connection: Connection) {}
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    try {
      const result = await this.connection.models[args.constraints[0].name]
        .findById(value)
        .where({ isDeleted: false });

      return !!result;
    } catch (e) {
      return false;
    }
  }

  defaultMessage(args?: ValidationArguments): string {
    return `${args.property} field must refer to existing ${args.constraints[0].name} document`;
  }
}
