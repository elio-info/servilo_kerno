import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsMongoId, IsNotEmpty, IsObject, IsString, MinLength } from "class-validator"
import { Telefonos_Type_Dto } from "src/cultura/codificadores-cult/infrastructure/telefonos.dto"
import { ConsejoPopular_Municipality_Model } from "src/cultura/consejo_popular/infrastructure/consejo_popular.schema"
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
    // @IsRelationShipWith(MunicipalityModel)
    @IsNotEmpty({ message: 'The consejo ppopular ID cannot be empty' })  
    consejopopular_municipality:ConsejoPopular_Municipality_Model

    // @ApiProperty({ type: 'ObjectId.Province' })
    // @IsMongoId()
    // @IsString({ message: 'The Id of the province must be a String' })
    // /* The line `// @IsRelationShipWith(ProvinceModel)` is a commented-out decorator in the TypeScript
    // class `Create_Proyecto_Sociocultural_Comunitario_Dto`. */
    // // @IsRelationShipWith(ProvinceModel)
    // @IsNotEmpty({ message: 'The Province ID cannot be empty' })  
    // province:string

    @ApiProperty({example:'La casa de Pedro Prieto'})
    @IsString()
    @MinLength(3)
    responsable:string

    @ApiProperty({
        example:`{"cell":12345678,"fijo":12345678,"trabajo":12345678} uno o los 3`,
        type:Telefonos_Type_Dto
    })
    // @Type()
    telefonos:Telefonos_Type_Dto
}
