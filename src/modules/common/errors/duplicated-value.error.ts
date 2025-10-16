export class DuplicatedValueError extends Error {
  constructor(message: string) {
    super(`Duplicated key on ${message} colection`);
  }
}
