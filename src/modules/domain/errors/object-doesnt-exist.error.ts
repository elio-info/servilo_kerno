export class ObjectDoesNotExist extends Error {
  constructor(
    message: string = 'The object you are trying to access does not exist',
  ) {
    super(message);
    Object.setPrototypeOf(this, ObjectDoesNotExist);
  }
}
