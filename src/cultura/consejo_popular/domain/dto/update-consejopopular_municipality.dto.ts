import { PartialType } from '@nestjs/mapped-types';
import { Create_ConsejoPopular_Municipality_Dto } from './create-consejopopular_municipality.dto';
import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';
import { ProvinceModel } from 'src/modules/province/infrastructure/province.schema';

export class Update_ConsejoPopular_Municipality_Dto extends PartialType(Create_ConsejoPopular_Municipality_Dto) {
    
    @IsOptional()
    @IsString({ message: 'The name of the consejo popular must be a String' })
  @IsNotEmpty({ message: 'The name of the consejo popular cannot be empty' })
  @MinLength(3)
  name: string;

  @IsOptional()
  @ApiProperty({ type: 'ObjectId.Municipality' })
  @IsMongoId()
  @IsString({ message: 'The Id of the municipality must be a String' })
  @IsRelationShipWith(MunicipalityModel)
  @IsNotEmpty({ message: 'The Municipality ID cannot be empty' })
  municipality: string;

  @IsOptional()
  @ApiProperty({ type: 'ObjectId.Province' })
  @IsMongoId()
  @IsString({ message: 'The Id of the province must be a String' })
  @IsRelationShipWith(ProvinceModel)
  @IsNotEmpty({ message: 'The Province ID cannot be empty' })
  province: string;

  @IsOptional()
  @IsDate()
  updateAt:Date
}
