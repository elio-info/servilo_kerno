import { Types } from 'mongoose';
import { WrongIdFormat } from '../errors/wrong-id-format.error';

export function validateId(id: string, moduleName?: string) {
  if (!Types.ObjectId.isValid(id)) {
    throw new WrongIdFormat(moduleName);
  }
}
