import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';
import { ProvinceModel } from 'src/modules/province/infrastructure/province.schema';

export class Create_ConsejoPopular_Municipality_Dto {
  @IsString({ message: 'The name of the consejo popular must be a String' })
  @IsNotEmpty({ message: 'The name of the consejo popular cannot be empty' })
  @MinLength(3)
  name: string;

  @ApiProperty({ type: 'ObjectId.Municipality' })
  @IsMongoId()
  @IsString({ message: 'The Id of the municipality must be a String' })
  @IsRelationShipWith(MunicipalityModel)
  @IsNotEmpty({ message: 'The Municipality ID cannot be empty' })
  municipality: string;

  @ApiProperty({ type: 'ObjectId.Province' })
  @IsMongoId()
  @IsString({ message: 'The Id of the province must be a String' })
  @IsRelationShipWith(ProvinceModel)
  @IsNotEmpty({ message: 'The Province ID cannot be empty' })
  province: string;

  @IsOptional()
  @IsDate()
  createAt:Date
}
