import { Municipality } from 'src/modules/municipality/domain/entities/municipality.entity';
import { EntityType } from 'src/modules/entity_type/domain/entities/entity-type.entity';
import { Place } from 'src/modules/place/domain/entities/place.entity';
export class Entity {
  id: string;
  entityType: EntityType;
  parentId: string;
  name: string;
  nitCode: string;
  abbreviation: string;
  resolution: string;
  resolutionDate: Date;
  issuedBy: string;
  domicilie: string;
  municipality: Municipality;
  place: Place;
  reeup: string;
  commercialRegister: string;
  updatedAt: Date;
  createdAt: Date;
}
