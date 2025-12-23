import { DataList } from 'src/modules/common/data-list';
import { Municipality } from '../entities/municipality.entity';
import { CreateMunicipalityDto } from '../dto/create-municipality.dto';
import { UpdateMunicipalityDto } from '../dto/update-municipality.dto';
import { MunicipalityModel } from '../../infrastructure/municipality.schema';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

export interface MunicipalityRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<Municipality>>;
  create: (municipality: CreateMunicipalityDto,traza:TrazasService) => Promise<Municipality>;
  findOne: (id: string) => Promise<Municipality>;
  update: (id: string,municipality: UpdateMunicipalityDto,traza:TrazasService) => Promise<Municipality>;
  remove: (id: string,traza:TrazasService) => Promise<Municipality>;
  search: (query) => Promise<Municipality[]>;
}
