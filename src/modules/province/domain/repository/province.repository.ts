import { DataList } from 'src/modules/common/data-list';
import { ProvinceEntity } from '../entities/province.entity';
import { UpdateProvinceDto } from '../dto/update-province.dto';
import { CreateProvinceDto } from '../dto/create-province.dto';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { SearchProvinceDto } from '../dto/search-province.dto';

export interface ProvinceRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<ProvinceEntity>| string>;
  create: (province: CreateProvinceDto,traza:TrazasService) => Promise<ProvinceEntity| string>;
  findOne: (id: string) => Promise<ProvinceEntity| string>;
  update: ( province: UpdateProvinceDto,traza:TrazasService) => Promise<ProvinceEntity| string>;
  remove: (id: string,traza:TrazasService) => Promise<ProvinceEntity|string>;
  search: (query:SearchProvinceDto) => Promise<ProvinceEntity[]| string>;
}
