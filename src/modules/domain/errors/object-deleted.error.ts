import { HttpException, HttpStatus } from '@nestjs/common';

export class ObjectDeletedError extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(
      message || `The object you are trying to access has been deleted `,
      status || HttpStatus.NOT_FOUND,
    );
    Object.setPrototypeOf(this, ObjectDeletedError);
  }
}
