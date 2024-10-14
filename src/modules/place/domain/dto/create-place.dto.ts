import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';

export class CreatePlaceDto {
  
  @ApiProperty({
    description: 'Nombre del lugar'
  })
  @IsString()
  @IsNotEmpty()
  @Min(4)
  name: string;

  
  @ApiProperty({
    description: 'Municipio al que pertence'
  })
  @IsString()
  @IsNotEmpty()
  @IsRelationShipWith(MunicipalityModel)
  @ApiProperty({ type: 'ObjectID.Municipality' })
  municipality: string;
}
