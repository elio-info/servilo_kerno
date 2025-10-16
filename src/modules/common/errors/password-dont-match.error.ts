export class PasswordDontMatchError extends Error {
  constructor(message: string) {
    super(`Password did not Match!!!`);
  }
}
