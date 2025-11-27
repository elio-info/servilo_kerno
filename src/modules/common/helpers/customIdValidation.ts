import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { error } from 'console';
import { Condition, Connection, ObjectId } from 'mongoose';

@ValidatorConstraint({ async: true })
@Injectable()
//aqui se valida si el elemento pertenece a la clase que se llama
export class IsRelationshipProvider implements ValidatorConstraintInterface {


  constructor(
    @InjectConnection() private readonly connection: Connection) {}
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
    return `${args.property} field must refer to existing ${args.constraints[0].name} document.`;
  }

  async validate_onTable(table_name:string, value_condition: {}, args={ isDeleted: false }): Promise<boolean> {
    let ssn=this.connection.startSession();
    try {
      console.log(table_name,value_condition,args);
      (await ssn).startTransaction()
      const result = await this.connection.db.collection(table_name)
        .find(value_condition).limit(100).toArray()
        // .where(args)
        // .exec();
        console.log('validate_onTable  **************** dentro **************');        
        console.log(result);
        console.log('validate_onTable  ****************** dentro ************');   
        (await ssn).commitTransaction();
        (await ssn).endSession();
      return !!result;
    } catch (e) {
        console.log('validate_onTable  ************     error  on   ******************');        
        console.log(e);
        console.log('validate_onTable  **********     error  on   ********************');
      (await ssn).abortTransaction();
      (await ssn).endSession();
      return false;
    }
    
  }

}
/**
 * 
 */
/* The `RelationshipValidator` class in TypeScript provides a method to validate relationships on a
specified table using a given value condition. */
export class RelationshipValidator {
  private cnn:Connection;
  constructor (private cnnt:Connection){
    this.cnn=cnnt;
  }
  async validateCondition_onTable (table_name:string, value_condition: {}, args={ isDeleted: false }): Promise<boolean> {
    console.log('validateCondition_onTable ',table_name,value_condition,args);
    let perra = await this.cnn.db.collection(table_name).estimatedDocumentCount(value_condition);    
    console.log('perra', perra);
    return perra>0;
  }

  async recoverCondition_onTable (table_name:string, value_condition: {}, args={ isDeleted: false }): Promise<Object> {    
    let perra = await this.cnn.db.collection(table_name).find(value_condition).limit(100).toArray();
    console.log(table_name,value_condition,args);
    console.log('perra', perra);
    return perra;
  }
}