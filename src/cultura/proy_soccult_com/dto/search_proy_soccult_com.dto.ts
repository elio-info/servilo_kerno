import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsMongoId, IsNotEmpty, IsObject, IsOptional, isString, IsString, MinLength } from "class-validator"
import { Telefonos_Type_Dto } from "src/cultura/codificadores-cult/infrastructure/telefonos.dto"
import { ConsejoPopular_Municipality_Model } from "../../consejo_popular/domain/schemas/consejo_popular.schema"
import { IsRelationShipWith } from "src/modules/common/decorators/validateIdExistence"
import { MunicipalityModel } from "src/modules/municipality/infrastructure/municipality.schema"
import { ProvinceModel } from "src/modules/province/infrastructure/province.schema"

export class Search_Proyecto_Sociocultural_Comunitario_Dto {
    @ApiProperty({example:'La casa de Pedro Prieto'})
    @IsNotEmpty()
    @IsString()
    @MinLength(3)    
    nombre:string
    /*
    @ApiProperty({ type: 'ObjectId.ConsejoPopular_Municipality',
        example:'66763c9511dbc2cb96b53d4d' })
    @IsMongoId()
    @IsNotEmpty({ message: 'The consejo ppopular ID cannot be empty' })  
    @IsString({ message: 'The Id of the consejo popular must be a String' })
    @IsRelationShipWith(ConsejoPopular_Municipality_Model)    
    consejopopular_municipality:string

    @ApiProperty({ type: 'ObjectId.MunicipalityModel',example:'esta es la que selecciona el consejo' })
    @IsMongoId()
    @IsString({ message: 'The Id of the province must be a String' })
    @IsRelationShipWith(MunicipalityModel)
    @IsNotEmpty({ message: 'The Municipality ID cannot be empty' })  
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
    // @Type()
    @IsString()
    telefonos:string
    
    @ApiProperty({example:'Se pone que actividades se realizan en el '})
    // @IsOptional()
    @IsString({ message: 'Mas de 3 letras' })
    // @MinLength(3)
    actividades:string

    @ApiProperty({example:'Contrato con que se creo: Acuerdo - Acta - Fecha '})
    // @IsOptional()
    @IsString({ message: 'Mas de 3 letras por cada una de las cosas' })
    // @MinLength(3)
    aprobado:string

    // @ApiProperty({example:'Contrato con que se creo: Acuerdo - Acta - Fecha '})
    // @IsOptional()
    // @IsString({ message: 'Mas de 3 letras por cada una de las cosas' })
    // // @MinLength(3)
    // cancelado:string
*/
}
