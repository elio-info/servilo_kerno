import { Municipality } from 'src/modules/municipality/domain/entities/municipality.entity';

export class Place {
  id: string;
  name: string;
  updatedAt: Date;
  createdAt: Date;
  municipality: Municipality;
}
