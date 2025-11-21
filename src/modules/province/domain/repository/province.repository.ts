import { DataList } from 'src/modules/common/data-list';
import { Province } from '../entities/province.entity';
import { UpdateProvinceDto } from '../dto/update-province.dto';
import { CreateProvinceDto } from '../dto/create-province.dto';
import { ProvinceDocument, ProvinceModel } from '../../infrastructure/province.schema';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

export interface ProvinceRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<Province>>;
  create: (province: CreateProvinceDto,traza:TrazasService) => Promise<ProvinceModel>;
  findOne: (id: string) => Promise<Province>;
  update: (id: string, province: UpdateProvinceDto,traza:TrazasService) => Promise<Province>;
  remove: (id: string,traza:TrazasService) => Promise<Province>;
  search: (query) => Promise<Province[]>;
}
