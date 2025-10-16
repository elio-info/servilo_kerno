import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export default class SearchValidate<A> implements PipeTransform {
  obj: A;
  constructor(c: new () => A) {
    this.obj = new c();
  }
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value.key) {
      return {};
    }
    if (this.obj.hasOwnProperty(value.key)) {
      return {
        [value.key]: { $regex: new RegExp(value.value), $options: 'i' },
      };
    } else {
      throw new BadRequestException(
        `Not Key Found in Model [${Object.keys(this.obj)}]`,
      );
    }
  }
}
