import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { Error } from 'mongoose';
import { ObjectNotFound } from '../object-not-found.error';
import { WrongIdFormat } from '../wrong-id-format.error';
import { InvalidPaginationError } from '../invalid-pagination.error';
import { DuplicatedValueError } from '../duplicated-value.error';
import { UserNotFound } from '../../../domain/errors/user-not-found.error';
import { InactiveUser } from '../../../domain/errors/user-no-active.error';
import { PasswordDontMatchError } from '../password-dont-match.error';

const errors = {
  [WrongIdFormat.name]: (error: Error) =>
    new BadRequestException(error.message),
  [ObjectNotFound.name]: (error: Error) => new NotFoundException(error.message),
  [InvalidPaginationError.name]: (error: Error) =>
    new BadRequestException(error.message),
  [UserNotFound.name]: (error: Error) => new NotFoundException(error.message),
  [DuplicatedValueError.name]: (error: Error) =>
    new BadRequestException(error.message),
  [InactiveUser.name]: (error: Error) => new BadRequestException(error.message),
  [PasswordDontMatchError.name]: (error: Error) =>
    new BadRequestException(error.message),
  // [ObjectIdError.name]: (error: Error) => new BadRequestException(error.message),
};

@Injectable()
export class ErrorMapperService {
  map(error: Error) {
    if (!error?.constructor?.name) return error;

    const mapFunction = errors[error.constructor.name];
    return mapFunction ? mapFunction(error) : error;
  }
}
