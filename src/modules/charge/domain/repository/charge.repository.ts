import { DataList } from 'src/modules/common/data-list';
import { Charge_Entity } from '../entities/charge.entity';
import { UpdateChargeDto } from '../dto/update-charge.dto';
import { CreateChargeDto } from '../dto/create-charge.dto';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

export interface ChargeRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<Charge_Entity>|string>;
  create: (charge: CreateChargeDto, traza:TrazasService) => Promise<Charge_Entity|string>;
  findOne: (id: string) => Promise<Charge_Entity|string>;
  update: (charge: UpdateChargeDto, traza:TrazasService) => Promise<Charge_Entity|string>;
  remove: (id: string, traza:TrazasService) => Promise<Charge_Entity|string>;
  search: (query) => Promise<Charge_Entity[]>;
}
