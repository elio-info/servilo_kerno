export class InactiveUser extends Error {
  constructor() {
    super('The user the user in no longer active');
  }
}
