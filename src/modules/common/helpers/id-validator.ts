import { ObjectId, Types } from 'mongoose';
import { WrongIdFormat } from '../errors/wrong-id-format.error';
import { validate } from 'class-validator';
import { IsRelationshipProvider } from './customIdValidation';

export function validateId(id: string, moduleName?: string) {
  if (!Types.ObjectId.isValid(id)) {
    throw new WrongIdFormat(moduleName);
  } else{ 
  // let pp= new Repos().validateId(id,moduleName) 
    console.log('valido id:',id,' con modulo:',moduleName)
  }
}
