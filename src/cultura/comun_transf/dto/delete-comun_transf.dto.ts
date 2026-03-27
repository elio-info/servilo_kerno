import { PartialType } from '@nestjs/mapped-types';
import { Create_Comunidad_Transformacion_Dto } from './create-comun_transf.dto';
import { IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';
import { ProvinceModel } from 'src/modules/province/infrastructure/province.schema';
import { Telefonos_Type_Dto } from 'src/cultura/codificadores-cult/infrastructure/telefonos.dto';
import { ConsejoPopular_Municipality_Model } from '../../consejo_popular/domain/schemas/consejo_popular.schema';
import { Comunidad_Transformacion_Model } from '../schemas/comun_transf.schema';

export class Delete_Comunidad_Transformacion_Dto  {
    @ApiProperty({  
        example:'66763c9511dbc2cb96b53d4d'})
    @IsMongoId()
    @IsString({ message: 'The Id of the comunidad must be a String' })
    @IsRelationShipWith(Comunidad_Transformacion_Model)
    @IsNotEmpty({ message: 'The Comunidad ID cannot be empty' })  
    id:string
    
    
}
