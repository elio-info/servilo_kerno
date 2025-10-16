export class InvalidPaginationError extends Error {
  constructor(message: string = 'Invalid page or pageSize') {
    super(message);
  }
}
