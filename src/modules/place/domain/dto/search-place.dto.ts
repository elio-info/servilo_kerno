import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';

export class SearchPlaceDto {
  
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  exactName: boolean=true;

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean=false;

  @IsString()
  @IsNotEmpty()
  @IsRelationShipWith(MunicipalityModel)
  municipality: string;
}
