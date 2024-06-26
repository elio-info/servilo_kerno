import { DataList } from 'src/modules/common/data-list';
import { ConsejoPopular_Municipality_Entity } from '../schemas/consejo_popular.entity';
import { Create_ConsejoPopular_Municipality_Dto } from '../dto/create-consejopopular_municipality.dto';
import { Update_ConsejoPopular_Municipality_Dto } from '../dto/update-consejopopular_municipality.dto';
import { ConsejoPopular_Municipality_Model } from '../schemas/consejo_popular.schema';

export interface ConsejoPopular_Municipality_Repository {
  findAll: (page: number, pageSize: number) => Promise<DataList<ConsejoPopular_Municipality_Entity>>;
  create: (cpmunicipality: Create_ConsejoPopular_Municipality_Dto) => Promise<void>;
  findOne: (id: string) => Promise<ConsejoPopular_Municipality_Entity>;
  update: (
    id: string,
    cpmunicipality: Update_ConsejoPopular_Municipality_Dto,
  ) => Promise<ConsejoPopular_Municipality_Entity>;
  remove: (id: string) => Promise<void>;
  search: (query) => Promise<ConsejoPopular_Municipality_Entity[]>;
}
