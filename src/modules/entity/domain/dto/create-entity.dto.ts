import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { EntityTypeModel } from 'src/modules/entity_type/infrastructure/entity-type.schema';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';
import { PlaceModel } from 'src/modules/place/infrastructure/places.schema';

export class CreateEntityDto {
  @ApiProperty({ type: 'ObjectID.EntityType' })
  @IsMongoId({ message: 'Entity Type Id must be valid' })
  @IsRelationShipWith(EntityTypeModel)
  entityType: string;

  @ApiProperty({ type: 'ObjectID.Entity' })
  @IsMongoId({ message: 'Parent Id must be valid' })
  @IsOptional()
  parentId?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(64)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  nitCode: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  abbreviation: string;

  @IsString()
  @MaxLength(64)
  @IsOptional()
  resolution: string;

  @IsDateString()
  @IsOptional()
  resolutionDate: Date;

  @IsString()
  @IsOptional()
  issuedBy: string;

  @IsString()
  @IsOptional()
  domicilie: string;

  @ApiProperty({ type: 'ObjectID.Municipality' })
  @IsMongoId({ message: 'Municipality Id must be valid' })
  @IsOptional()
  @IsRelationShipWith(MunicipalityModel)
  municipality: string;

  @ApiProperty({ type: 'ObjectID.Place' })
  @IsMongoId({ message: 'Place Id must be valid' })
  @IsOptional()
  @IsRelationShipWith(PlaceModel)
  place: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  reeup: string;

  @IsString()
  commercialRegister: string;
}
