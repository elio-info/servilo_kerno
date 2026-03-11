import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';
import { ProvinceModel } from 'src/modules/province/infrastructure/province.schema';
import { Telefonos_Type_Dto } from 'src/cultura/codificadores-cult/infrastructure/telefonos.dto';
import { ConsejoPopular_Municipality_Model } from '../../consejo_popular/domain/schemas/consejo_popular.schema';
import { Type } from 'class-transformer';
import { Proyecto_Sociocultural_Comunitario_Model } from '../schemas/proy_soccult_com.schema';

export class Remove_Proyecto_Sociocultural_Comunitario_Dto {
    
    @ApiProperty({ 
        example:'66763c9511dbc2cb96b53d4d'})
    @IsMongoId()
    @IsString({ message: 'The Id of the proyecto soc com must be a String' })
    @IsRelationShipWith(Proyecto_Sociocultural_Comunitario_Model)
    // @IsNotEmpty({ message: 'The Consejo Popular ID cannot be empty' }) 
    @Type(()=>Proyecto_Sociocultural_Comunitario_Model) 
    id:string;
}
