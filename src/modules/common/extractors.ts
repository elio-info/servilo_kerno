import { Municipality } from 'src/modules/municipality/domain/entities/municipality.entity';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';
import { ProvinceEntity } from 'src/modules/province/domain/entities/province.entity';
import { ProvinceModel } from 'src/modules/province/infrastructure/province.schema';
import { EntityType } from '../entity_type/domain/entities/entity-type.entity';
import { EntityTypeModel } from '../entity_type/infrastructure/entity-type.schema';
import { EntityModel } from '../entity/infrastructure/entity.schema';
import { Entity } from '../entity/domain/entities/entity.entity';
import { PlaceModel } from '../place/infrastructure/places.schema';
import { Place } from '../place/domain/entities/place.entity';
import { Clasifica_Nivel_EntidadCultural } from 'src/cultura/codificadores-cult/enums/codificadores';
import { Nomencladores_Generales } from 'src/cultura/codificadores-cult/infrastructure/codificadores_nomencladores.controller';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

export function getUserHTTP_JWTS(hds_tk:string): string {
  // console.log(hds_tk);
      let hds_jwtk= new JwtService().decode(hds_tk.split(' ')[1]);

      let hds_uss=hds_jwtk['username']+' ['+ hds_jwtk['rol']+']';
      // console.log(hds_uss);
      return hds_uss;
}

export function extractMunicipality(
  municipality: MunicipalityModel,
): Municipality {
  return {
    id: municipality._id.toString(),
    name: municipality.name,
    isDeleted:municipality.isDeleted,
    createdAt: municipality.createdAt,
    updatedAt: municipality.updatedAt,
    province: extractProvince(municipality.province),
  };
}

export function extractProvince(province: ProvinceModel): ProvinceEntity {
  return {
    id: province._id.toString(),
    name: province.name,
    isDeleted:province.isDeleted,
    createdAt: province.createdAt,
    updatedAt: province.updatedAt,
  };
}

export function extractEntityType(entityType: EntityTypeModel): EntityType {
  return {
    id: entityType._id.toString(),
    name: entityType.name,
    hierarchy: entityType.hierarchy,
    createdAt: entityType.createdAt,
    updatedAt: entityType.updatedAt,
  };
}

export function extractPlace(place: PlaceModel): Place {
  if (place) {
    return {
      id: place._id.toString(),
      name: place.name,
      updatedAt: place.updatedAt,
      createdAt: place.createdAt,
      municipality: extractMunicipality(place.municipality),
    };
  } else {
    return null;
  }
}

export function extractEntity(entity: EntityModel): Entity {
  if (!entity) return null;
  return {
    id: entity._id.toString(),
    entityType: extractEntityType(entity.entityType),
    parentId: entity.parentId ? entity.parentId._id.toString() : null,
    name: entity.name,
    nivel: entity.nivel,
    nitCode: entity.nitCode,
    abbreviation: entity.abbreviation,
    resolution: entity.resolution,
    resolutionDate: entity.resolutionDate,
    issuedBy: entity.issuedBy,
    domicilie: entity.domicilie,
    municipality: extractMunicipality(entity.municipality),
    place: extractPlace(entity.place),
    reeup: entity.reeup,
    commercialRegister: entity.commercialRegister,
    updatedAt: entity.updatedAt,
    createdAt: entity.createdAt,
  };
}
