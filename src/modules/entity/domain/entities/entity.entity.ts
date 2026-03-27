import { Municipality } from 'src/modules/municipality/domain/entities/municipality.entity';
import { EntityType } from 'src/modules/entity_type/domain/entities/entity-type.entity';
import { Place } from 'src/modules/place/domain/entities/place.entity';
import { Clasifica_Nivel_EntidadCultural } from 'src/cultura/codificadores-cult/enums/codificadores';
export class Entity_Entity {
  id: string;
  entityType: string;//EntityType
  parentId: string;//Entity_Entity o null
  name: string;
  nivel:string;//Clasifica_Nivel_EntidadCultural
  nitCode: string;
  abbreviation: string;
  resolution: string;
  resolutionDate: Date;
  issuedBy: string;
  domicilie: string;
  municipality:string ;//Municipality
  consejo_p:string ;//ConsejoPopular_Municipality
  reeup: string;
  commercialRegister: string;
  updatedAt: Date;
  createdAt: Date;
  isDeleted:boolean;
}
