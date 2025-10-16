export class WrongIdFormat extends Error {
  constructor(IdFrom?: string) {
    super(
      IdFrom
        ? `The provided id for ${IdFrom} does not have the correct format`
        : 'The provided id does not have the correct format',
    );
  }
}
