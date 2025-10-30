import { ApiOperation, ApiProperty } from '@nestjs/swagger';

export class DataList<Object> {
  data: Object[];
  totalPages: number;
  currentPage: number;
}
