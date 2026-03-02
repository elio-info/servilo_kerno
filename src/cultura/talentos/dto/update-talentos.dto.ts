import { ApiProperty } from "@nestjs/swagger"
import { IsArray, isMongoId, IsMongoId, isNotEmpty, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { NomenclaCat_ContManifestacion_Especialidad_Entity } from "src/cultura/categorias-contrat-mancul/n_catgcont-m_espc/schemas/n_catgcont-m_espc.entity"
import { NomenclaCategorias_ContManifestacion_Especialidad_Model } from "src/cultura/categorias-contrat-mancul/n_catgcont-m_espc/schemas/n_catgcont-m_espc.schema"
import { Nomenclador_Clasifica_ContratoTalento } from "src/cultura/codificadores-cult/enums/codificadores"
import { ApiPaginatedResponse } from "src/modules/common/doc/api-paginated-response.decorator"
import { Entity_Entity } from "src/modules/entity/domain/entities/entity.entity"
import { Create_Talento_Artistico_Dto } from "./create-talentos.dto"
import { IsRelationShipWith } from "src/modules/common/decorators/validateIdExistence"
import { EntityModel } from "src/modules/entity/infrastructure/entity.schema"
import { Talento_Artistico_Model } from "../schemas/talentos.schema"
import { NomenclaCategorias_ContratacionManifestacion_Model } from "src/cultura/categorias-contrat-mancul/n_catgcont-m/schemas/n_catgcont-m.schema"

export class Update_Talento_Artistico_Dto{
    @IsMongoId()
    @IsRelationShipWith(Talento_Artistico_Model)
    @IsNotEmpty()
    id:string

     @IsOptional()
     @ApiProperty({example:'Pedro Prieto'})
    @IsString()
    @MinLength(3)
    name :string

    //Nomencla_Categorias_ContratacionManifestacion_Clss.id
    @IsOptional()
    @ApiProperty({example:'666b7d6e80597b171ef1495d Danza Folklorica'})
    @IsMongoId()
    @IsArray()
    @IsNotEmpty({message:'NO vacio'})
    @IsRelationShipWith(NomenclaCategorias_ContratacionManifestacion_Model)
    manifest:string[]
       
    @IsOptional()
    @ApiProperty({  default:true, description:'esto es para pensar' })
    persona_Talento_Artistico:boolean

    //Nomenclador_Clasifica_ContratoTalento
    @IsOptional()
    @ApiProperty({  
        default:Nomenclador_Clasifica_ContratoTalento.A,
        type: String,
        enum:Object.keys(Nomenclador_Clasifica_ContratoTalento) })
    contrato_talento:string
    
    //Entity
    @IsOptional()
    @IsRelationShipWith(EntityModel)
    @IsMongoId()
    entidad_talento:string

    @IsOptional()
    @ApiProperty({  default:false })
    isDeleted:boolean    
    
}