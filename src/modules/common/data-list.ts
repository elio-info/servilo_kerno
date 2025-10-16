import { ApiOperation, ApiProperty } from '@nestjs/swagger';

export class DataList<TData> {
  data: TData[];
  totalPages: number;
  currentPage: number;
}
