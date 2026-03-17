import { PartialType } from '@nestjs/mapped-types';
import { Create_Comunidad_Transformacion_Dto } from './create-comun_transf.dto';
import { IsBoolean, IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';
import { ProvinceModel } from 'src/modules/province/infrastructure/province.schema';
import { Telefonos_Type_Dto } from 'src/cultura/codificadores-cult/infrastructure/telefonos.dto';
import { ConsejoPopular_Municipality_Model } from '../../consejo_popular/domain/schemas/consejo_popular.schema';
import { Comunidad_Transformacion_Model } from '../schemas/comun_transf.schema';

export class Search_Comunidad_Transformacion_Dto  {
    @IsOptional()
    @IsBoolean()
    exactName:boolean
    
    @IsOptional()
    @ApiProperty({example:'La casa de Pedro Prieto'})
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name:string
    
    @IsOptional()
    @ApiProperty({  
        example:'66763c9511dbc2cb96b53d4d'})
    @IsMongoId()
    @IsString({ message: 'The Id of the consejo popular must be a String' })
    @IsRelationShipWith(ConsejoPopular_Municipality_Model)
    @IsNotEmpty({ message: 'The Consejo Popular ID cannot be empty' })  
    consejopopular_municipality:string

    @IsOptional()
    @IsMongoId()
    @IsString({ message: 'The Id of the province must be a String' })
    @IsRelationShipWith(MunicipalityModel)
    @IsNotEmpty({ message: 'The Municipality ID cannot be empty' })  
    municipio:string

    @IsOptional()
    @ApiProperty({example:'La casa de Pedro Prieto'})
    @IsString()
    @MinLength(3)
    responsable:string

    @IsOptional()
    @ApiProperty({
        example:`{"cell":12345678,"fijo":12345678,"trabajo":12345678} uno o los 3`
         
    })
    telefonos:string

    @IsOptional()
    @IsBoolean()
    isDeleted:boolean=false
}
