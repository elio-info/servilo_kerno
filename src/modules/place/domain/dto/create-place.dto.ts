import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';

export class CreatePlaceDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsRelationShipWith(MunicipalityModel)
  municipality: string;
}
