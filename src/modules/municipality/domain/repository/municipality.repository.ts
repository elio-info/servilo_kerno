import { DataList } from 'src/modules/common/data-list';
import { Municipality } from '../entities/municipality.entity';
import { CreateMunicipalityDto } from '../dto/create-municipality.dto';
import { UpdateMunicipalityDto } from '../dto/update-municipality.dto';
import { MunicipalityModel } from '../../infrastructure/municipality.schema';

export interface MunicipalityRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<Municipality>>;
  create: (municipality: CreateMunicipalityDto) => Promise<void>;
  findOne: (id: string) => Promise<Municipality>;
  update: (
    id: string,
    municipality: UpdateMunicipalityDto,
  ) => Promise<Municipality>;
  remove: (id: string) => Promise<void>;
  search: (query) => Promise<Municipality[]>;
}
