import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';

export class SearchPlaceDto {
  constructor() {
    this.name = '';
    this.municipality = '';
  }
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsRelationShipWith(MunicipalityModel)
  @ApiProperty({ type: 'ObjectID.Municipality' })
  municipality: string;
}
