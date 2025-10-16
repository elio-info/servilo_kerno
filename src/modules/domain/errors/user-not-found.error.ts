export class UserNotFound extends Error {
  constructor() {
    super('The user can not be found');
  }
}
