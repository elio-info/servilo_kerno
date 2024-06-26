import { PartialType } from '@nestjs/mapped-types';
import { Create_Comunidad_Transformacion_Dto } from './create-comun_transf.dto';
import { IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';
import { ProvinceModel } from 'src/modules/province/infrastructure/province.schema';
import { Telefonos_Type_Dto } from 'src/cultura/codificadores-cult/infrastructure/telefonos.dto';
import { ConsejoPopular_Municipality_Model } from '../../consejo_popular/domain/schemas/consejo_popular.schema';

export class Update_Comunidad_Transformacion_Dto extends PartialType(Create_Comunidad_Transformacion_Dto) {
    @IsOptional()
    @ApiProperty({example:'La casa de Pedro Prieto'})
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    nombre:string
    
    @IsOptional()
    @ApiProperty({ 
        type: 'ObjectId.ConsejoPopular_Municipality', 
        example:'66763c9511dbc2cb96b53d4d'})
    @IsMongoId()
    @IsString({ message: 'The Id of the consejo popular must be a String' })
    // @IsRelationShipWith(MunicipalityModel)
    @IsNotEmpty({ message: 'The Consejo Popular ID cannot be empty' })  
    consejopopular_municipality:ConsejoPopular_Municipality_Model

    // @IsOptional()
    // @ApiProperty({ type: 'ObjectId.Province' })
    // @IsMongoId()
    // @IsString({ message: 'The Id of the province must be a String' })
    // // @IsRelationShipWith(ProvinceModel)
    // @IsNotEmpty({ message: 'The Province ID cannot be empty' })  
    // province:string

    @IsOptional()
    @ApiProperty({example:'La casa de Pedro Prieto'})
    @IsString()
    @MinLength(3)
    responsable:string

    @IsOptional()
    @ApiProperty({
        example:`{"cell":12345678,"fijo":12345678,"trabajo":12345678} uno o los 3`,
        type: Telefonos_Type_Dto
    })
    telefonos:Telefonos_Type_Dto
}
