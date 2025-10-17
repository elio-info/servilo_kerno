import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString, MinLength } from "class-validator"
import { Telefonos_Type_Dto } from "src/cultura/codificadores-cult/infrastructure/telefonos.dto"
import { ConsejoPopular_Municipality_Model } from "../../consejo_popular/domain/schemas/consejo_popular.schema"
import { IsRelationShipWith } from "src/modules/common/decorators/validateIdExistence"
import { MunicipalityModel } from "src/modules/municipality/infrastructure/municipality.schema"
import { ProvinceModel } from "src/modules/province/infrastructure/province.schema"

export class Create_Comunidad_Transformacion_Dto {
    @ApiProperty({example:'La casa de Pedro Prieto'})
    @IsNotEmpty()
    @IsString()
    @MinLength(3)    
    nombre:string
    
    @ApiProperty({ type: 'ObjectId.ConsejoPopular_Municipality',
        example:'66763c9511dbc2cb96b53d4d' })
    @IsMongoId()
    @IsString({ message: 'The Id of the consejo popular must be a String' })
    @IsRelationShipWith(ConsejoPopular_Municipality_Model)
    @IsNotEmpty({ message: 'The consejo ppopular ID cannot be empty' })  
    consejopopular_municipality:string

    @ApiProperty({ type: 'ObjectId.MunicipalityModel' })
    @IsMongoId()
    @IsString({ message: 'The Id of the province must be a String' })
    @IsRelationShipWith(MunicipalityModel)
    @IsNotEmpty({ message: 'The Municipality ID cannot be empty' })  
    municipio:string

    @ApiProperty({example:'La casa de Pedro Prieto'})
    @IsString()
    @MinLength(3)
    responsable:string

    @ApiProperty({
        example:`{"cell":12345678,"fijo":12345678,"trabajo":12345678} uno o los 3`
    })
    @IsString()
    telefonos:string

    @ApiProperty({example:'Se pone opcional lo que describe'})
    @IsOptional()
    @IsString({ message: 'Mas de 3 letras' })
    // @MinLength(3)
    observacion:string
}
