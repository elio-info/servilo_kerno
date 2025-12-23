import { ProvinceEntity } from 'src/modules/province/domain/entities/province.entity';

export class Municipality {
  id: string;
  name: string;
  isDeleted:boolean;
  createdAt: Date;
  updatedAt: Date;
  province: ProvinceEntity;
}
