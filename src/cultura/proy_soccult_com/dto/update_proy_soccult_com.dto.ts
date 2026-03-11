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

export class Update_Proyecto_Sociocultural_Comunitario_Dto {
    @ApiProperty({ 
        example:'66763c9511dbc2cb96b53d4d'})
    @IsMongoId()
    @IsString({ message: 'The Id of the proyecto soc com must be a String' })
    @IsRelationShipWith(Proyecto_Sociocultural_Comunitario_Model)
    @IsNotEmpty({ message: 'The Consejo Popular ID cannot be empty' }) 
    @Type(()=>Proyecto_Sociocultural_Comunitario_Model) 
    id:string;

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
    @IsNotEmpty({ message: 'The Consejo Popular ID cannot be empty' }) 
    @IsRelationShipWith(ConsejoPopular_Municipality_Model)
    @Type(()=> ConsejoPopular_Municipality_Model)    
    consejopopular_municipality:string

    @IsOptional()
    @IsMongoId()
    @IsString({ message: 'The Id of the municipio must be a String' })
    @IsRelationShipWith(MunicipalityModel)
    @Type(()=> MunicipalityModel)
    @IsNotEmpty({ message: 'The Province ID cannot be empty' })  
    municipio:string

    @ApiProperty({example:'Calle #11 entre #8 y San Ignacio'})
    @IsString({ message: 'Mas de 3 letras' })
    @MinLength(3)
    direccion:string

    @ApiProperty({example:'Pedro Prieto'})
    @IsString({ message: 'Mas de 3 letras' })
    @MinLength(3)
    gestor:string

    @ApiProperty({
        example:`{"cell":12345678,"fijo":12345678,"trabajo":12345678} uno o los 3`
    })
    @IsOptional()
    @IsString()
    telefonos:string
    
    @ApiProperty({example:'Se pone que actividades se realizan en el '})
    @IsOptional()
    @IsString({ message: 'Mas de 3 letras' })
    @MinLength(3)
    actividades:string

    @ApiProperty({example:'Contrato con que se creo: Acuerdo - Acta - Fecha '})
    @IsOptional()
    @IsString({ message: 'Mas de 3 letras por cada una de las cosas' })
    @MinLength(3)
    aprobado:string

    @ApiProperty({example:'Contrato con que se creo: Acuerdo - Acta - Fecha '})
    @IsOptional()
    @IsString({ message: 'Mas de 3 letras por cada una de las cosas' })
    @MinLength(3)
    cancelado:string
}
