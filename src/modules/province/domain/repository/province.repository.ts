import { DataList } from 'src/modules/common/data-list';
import { ProvinceEntity } from '../entities/province.entity';
import { UpdateProvinceDto } from '../dto/update-province.dto';
import { CreateProvinceDto } from '../dto/create-province.dto';
import { ProvinceDocument, ProvinceModel } from '../../infrastructure/province.schema';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

export interface ProvinceRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<ProvinceEntity>>;
  create: (province: CreateProvinceDto,traza:TrazasService) => Promise<ProvinceEntity>;
  findOne: (id: string) => Promise<ProvinceEntity>;
  update: (id: string, province: UpdateProvinceDto,traza:TrazasService) => Promise<ProvinceEntity>;
  remove: (id: string,traza:TrazasService) => Promise<ProvinceEntity>;
  search: (query) => Promise<ProvinceEntity[]>;
}
