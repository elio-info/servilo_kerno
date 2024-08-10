import { miniProvince, Province } from 'src/modules/province/domain/entities/province.entity';

export class Municipality {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  province: Province;
}

export class miniMunicipality {
  id: string;
  name: string;
  province: miniProvince;
}
