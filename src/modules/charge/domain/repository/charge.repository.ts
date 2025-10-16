import { DataList } from 'src/modules/common/data-list';
import { Charge } from '../entities/charge.entity';
import { UpdateChargeDto } from '../dto/update-charge.dto';
import { CreateChargeDto } from '../dto/create-charge.dto';

export interface ChargeRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<Charge>>;
  create: (charge: CreateChargeDto) => Promise<void>;
  findOne: (id: string) => Promise<Charge>;
  update: (id: string, charge: UpdateChargeDto) => Promise<Charge>;
  remove: (id: string) => Promise<void>;
  search: (query) => Promise<Charge[]>;
}
