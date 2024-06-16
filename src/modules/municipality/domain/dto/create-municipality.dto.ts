import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { ProvinceModel } from 'src/modules/province/infrastructure/province.schema';

export class CreateMunicipalityDto {
  @IsString({ message: 'The name of the municipality must be a String' })
  @IsNotEmpty({ message: 'The name of the municipality cannot be empty' })
  name: string;

  @ApiProperty({ type: 'ObjectId.Province' })
  @IsMongoId()
  @IsString({ message: 'The Id of the province must be a String' })
  @IsRelationShipWith(ProvinceModel)
  @IsNotEmpty({ message: 'The Province ID cannot be empty' })
  province: string;
}
