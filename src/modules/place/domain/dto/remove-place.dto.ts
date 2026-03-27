import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaceDto } from './create-place.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';
import { PlaceModel } from '../../infrastructure/place.schema';

export class RemovePlaceDto {
    @ApiProperty({ 
        example:`6669ff90079184e73863190a de Pinar del Rio`
    })
    @IsMongoId({message:'No es formato valido'})
    @IsString({ message: 'The Id of the place must be a String' })
    @IsRelationShipWith(PlaceModel)
    @IsNotEmpty({ message: 'The Place ID cannot be empty' })
    id: string;

}
