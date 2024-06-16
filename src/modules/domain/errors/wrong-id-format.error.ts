export class WrongIdFormat extends Error {
  constructor(
    message: string = 'The provided id does not have the correct format',
  ) {
    super(message);
    Object.setPrototypeOf(this, WrongIdFormat);
  }
}
