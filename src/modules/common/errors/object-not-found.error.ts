export class ObjectNotFound extends Error {
  constructor(type?: string) {
    super(type ? `Object of type ${type} not found` : 'Object not found');
  }
}
