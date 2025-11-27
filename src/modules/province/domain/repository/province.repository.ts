import { DataList } from 'src/modules/common/data-list';
import { Province } from '../entities/province.entity';
import { UpdateProvinceDto } from '../dto/update-province.dto';
import { CreateProvinceDto } from '../dto/create-province.dto';
import { ProvinceDocument, ProvinceModel } from '../../infrastructure/province.schema';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

export interface ProvinceRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<ProvinceModel>>;
  create: (province: CreateProvinceDto,traza:TrazasService) => Promise<ProvinceModel>;
  findOne: (id: string) => Promise<ProvinceModel>;
  update: (id: string, province: UpdateProvinceDto,traza:TrazasService) => Promise<ProvinceModel>;
  remove: (id: string,traza:TrazasService) => Promise<ProvinceModel>;
  search: (query) => Promise<ProvinceModel[]>;
}
