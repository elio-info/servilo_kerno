import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';
import { ProvinceModel } from 'src/modules/province/infrastructure/province.schema';

export default class Search_ConsejoPopular_MunicipalityDto {
 
  @IsOptional()
  @IsBoolean()
  exactName: boolean=true;

  @IsString({ message: 'The name of the municipality must be a String' })
  @IsNotEmpty({ message: 'The name of the municipality cannot be empty' })
  @IsOptional()
  name: string;
  
  @ApiProperty({ type: 'ObjectId.Province' })
  @IsMongoId()
  @IsString({ message: 'The Id of the province must be a String' })
  @IsRelationShipWith(ProvinceModel)
  @IsNotEmpty({ message: 'The Province ID cannot be empty' })
  @IsOptional()
  provinceId: string;

  @ApiProperty({ type: 'ObjectId.Municipality' })
  @IsMongoId()
  @IsString({ message: 'The Id of the municipalities must be a String' })
  @IsRelationShipWith(MunicipalityModel)
  @IsNotEmpty({ message: 'The Municipality ID cannot be empty' })
  @IsOptional()
  municipalityId: string;
}
