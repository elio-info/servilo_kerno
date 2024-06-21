import { Types } from 'mongoose';
import { WrongIdFormat } from '../errors/wrong-id-format.error';

export function validateId(id: string, moduleName?: string) {
  if (!Types.ObjectId.isValid(id)) {
    throw new WrongIdFormat(moduleName);
  } else{
    console.log('valido id:',id,' con modulo:',moduleName)
  }
}
