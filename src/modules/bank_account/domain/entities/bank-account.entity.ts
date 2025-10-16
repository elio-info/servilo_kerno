import { Municipality } from 'src/modules/municipality/domain/entities/municipality.entity';
import { Entity } from 'src/modules/entity/domain/entities/entity.entity';
export class BankAccount {
  id: string;
  entity: Entity;
  isCard: boolean;
  accountType: string;
  account: string;
  titular: string;
  bank: string;
  agency: string;
  subsidiary: string;
  address: string;
  municipality: Municipality;
  updatedAt: Date;
  createdAt: Date;
}
