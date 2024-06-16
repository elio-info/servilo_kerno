import { ApiProperty } from '@nestjs/swagger';

export class PhotoDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  photo: any;
}
