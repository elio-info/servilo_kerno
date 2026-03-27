import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { Timestamp } from "rxjs"
import { IsRelationShipWith } from "src/modules/common/decorators/validateIdExistence"
import { NomenclaCategorias_ContratacionManifestacion_Model } from "../schemas/n_catgcont-m.schema"


export class Remove_NomenclaCategorias_ContratacionManifestacion_Dto {    
    @ApiProperty({
        example:'665f7c4808023e4c264a4f9b',
        description:`Esta el la llave del Objeto que se trabajara en cuestion`
    })
    @IsMongoId()
    @IsRelationShipWith(NomenclaCategorias_ContratacionManifestacion_Model)
    @IsString()
    id:string      
}
