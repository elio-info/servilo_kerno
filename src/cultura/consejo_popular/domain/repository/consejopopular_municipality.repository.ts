import { DataList } from 'src/modules/common/data-list';
import { ConsejoPopular_Municipality_Entity } from '../entities/consejo_popular.entity';
import { Create_ConsejoPopular_Municipality_Dto } from '../dto/create-consejopopular_municipality.dto';
import { Update_ConsejoPopular_Municipality_Dto } from '../dto/update-consejopopular_municipality.dto';
import { ConsejoPopular_Municipality_Model } from '../../infrastructure/consejo_popular.schema';

export interface MunicipalityRepository {
  findAll: (page: number, pageSize: number) => Promise<DataList<ConsejoPopular_Municipality_Entity>>;
  create: (municipality: Create_ConsejoPopular_Municipality_Dto) => Promise<void>;
  findOne: (id: string) => Promise<ConsejoPopular_Municipality_Entity>;
  update: (
    id: string,
    municipality: Update_ConsejoPopular_Municipality_Dto,
  ) => Promise<ConsejoPopular_Municipality_Entity>;
  remove: (id: string) => Promise<void>;
  search: (query) => Promise<ConsejoPopular_Municipality_Entity[]>;
}
