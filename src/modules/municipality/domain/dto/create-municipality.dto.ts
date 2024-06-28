import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { ProvinceModel } from 'src/modules/province/infrastructure/province.schema';

export class CreateMunicipalityDto {
  @ApiProperty({
    description:'ombre del municio. No debe de repetirse en el Provincia',
    required:true,
    minLength:3,
    type:String
  })
  @IsString({ message: 'The name of the municipality must be a String' })
  @IsNotEmpty({ message: 'The name of the municipality cannot be empty' })
  name: string;

  @ApiProperty({ type: 'ObjectId.Province',
    example:`6669ff90079184e73863190a de Pinar del Rio`
   })
  @IsMongoId({message:'No es formato valido'})
  @IsString({ message: 'The Id of the province must be a String' })
  //@IsRelationShipWith(ProvinceModel)
  @IsNotEmpty({ message: 'The Province ID cannot be empty' })
  province: string;
}
