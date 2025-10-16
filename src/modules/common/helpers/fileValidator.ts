import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export function CustomFileValidator() {
  return new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: new RegExp('(jpeg|jpg|png)'),
    })
    .addMaxSizeValidator({
      maxSize: 30000,
    })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    });
}
