import { PartialType } from '@nestjs/mapped-types';
import { Create_Proyecto_Sociocultural_Comunitario_Dto } from './create-proy_soccult_com.dto';
import { IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';
import { ProvinceModel } from 'src/modules/province/infrastructure/province.schema';
import { Telefonos_Type_Dto } from 'src/cultura/codificadores-cult/infrastructure/telefonos.dto';

export class UpdateProySoccultComDto extends PartialType(Create_Proyecto_Sociocultural_Comunitario_Dto) {
    @IsOptional()
    @ApiProperty({example:'La casa de Pedro Prieto'})
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    nombre:string
    
    @IsOptional()
    @ApiProperty({ type: 'ObjectId.Province' })
    @IsMongoId()
    @IsString({ message: 'The Id of the province must be a String' })
    // @IsRelationShipWith(MunicipalityModel)
    @IsNotEmpty({ message: 'The Province ID cannot be empty' })  
    municipality:string

    @IsOptional()
    @ApiProperty({ type: 'ObjectId.Province' })
    @IsMongoId()
    @IsString({ message: 'The Id of the province must be a String' })
    // @IsRelationShipWith(ProvinceModel)
    @IsNotEmpty({ message: 'The Province ID cannot be empty' })  
    province:string

    @IsOptional()
    @ApiProperty({example:'La casa de Pedro Prieto'})
    @IsString()
    @MinLength(3)
    responsable:string

    @IsOptional()
    @ApiProperty({example:'{cell:12345678,fijo:12345678,trabajo:12345678} uno o los 3'})
    @IsObject()
    telefonos:Telefonos_Type_Dto
}
