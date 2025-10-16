import { DataList } from 'src/modules/common/data-list';
import { Province } from '../entities/province.entity';
import { UpdateProvinceDto } from '../dto/update-province.dto';
import { CreateProvinceDto } from '../dto/create-province.dto';

export interface ProvinceRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<Province>>;
  create: (province: CreateProvinceDto) => Promise<void>;
  findOne: (id: string) => Promise<Province>;
  update: (id: string, province: UpdateProvinceDto) => Promise<Province>;
  remove: (id: string) => Promise<void>;
  search: (query) => Promise<Province[]>;
}
