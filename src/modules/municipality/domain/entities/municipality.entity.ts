import { Province } from 'src/modules/province/domain/entities/province.entity';

export class Municipality {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  province: Province;
}
