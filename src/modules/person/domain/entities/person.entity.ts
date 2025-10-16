import { Entity } from 'src/modules/entity/domain/entities/entity.entity';
import { Municipality } from 'src/modules/municipality/domain/entities/municipality.entity';

export class Person {
  id: string;
  name: string;
  lastName1: string;
  lastName2: string;
  ci: string;
  email: string;
  skinColor: string;
  phone: string;
  isActive: boolean;
  username: string;
  passwordExpirationDate: Date;
  address: string;
  image: string;
  role: string;
  entity: Entity;
  gender: string;
  updatedAt: Date;
  createdAt: Date;
  municipality: Municipality;
}
