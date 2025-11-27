import { Connection, ObjectId, Types } from 'mongoose';
import { WrongIdFormat } from '../errors/wrong-id-format.error';
import { validate, ValidationArguments } from 'class-validator';
import { IsRelationshipProvider, RelationshipValidator } from './customIdValidation';
import { InjectConnection } from '@nestjs/mongoose';
import { ErrorModule } from '../errors/error.module';
/**
 * Validar el formato de la llave
 * @param id 
 * @param moduleName 
 */
export function validateId_Format(id: string, moduleName?: string) {
  if (!Types.ObjectId.isValid(id)) {
    throw new WrongIdFormat(id);
  } else{   
    console.log('valido format id:',id,' con modulo:',moduleName)
  }
}
export function validateId(id: string, moduleName?: string) {
  if (!Types.ObjectId.isValid(id)) {
    throw new WrongIdFormat(moduleName);
  } else{   
    console.log('valido format id:',id,' con modulo:',moduleName)
  }
}


export async function validateId_OnTable( cnn :Connection, table_name:string, value_condition: Object, args={ isDeleted: false }) {
  let mcnn= new RelationshipValidator(cnn);
  console.log(table_name,value_condition,args);
  let id_on_table= await mcnn.validateCondition_onTable(table_name,value_condition,args);
  console.log('id_on_table:',id_on_table);
  let mssg='';
  if (!id_on_table) {
    mssg='No aparece elemento '+value_condition.toString()+' en tabla '+table_name+ ' con las restricciones '+ args.toString();
    console.log(mssg);  
    return {ok:false,mss:mssg}  ;
  } else{  
    mssg= `valido id: ${id_on_table}`;
    console.log(mssg);  
    return {ok:false,mss:mssg}  ;
  }
}
