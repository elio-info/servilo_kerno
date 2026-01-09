import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { ProvinceModel } from 'src/modules/province/infrastructure/province.schema';

export default class SearchMunicipalityDto {
  
  @IsString({ message: 'The name of the municipality must be a String' })
  @IsNotEmpty({ message: 'The name of the municipality cannot be empty' })
  @IsOptional()
  name: string;

  @IsOptional()
  @IsBoolean()
  exactName: boolean=true; 

  @IsOptional()
  @ApiProperty({ type: 'ObjectId.Province' })
  @IsMongoId()
  @IsString({ message: 'The Id of the province must be a String' })
  @IsRelationShipWith(ProvinceModel)
  @IsNotEmpty({ message: 'The Province ID cannot be empty' })
  province: string;

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean=false;
}
