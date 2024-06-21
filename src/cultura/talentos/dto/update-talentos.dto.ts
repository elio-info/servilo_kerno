import { ApiProperty } from "@nestjs/swagger"
import { IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { Nomencla_CategoriasContratacionManifestacion_Especialidad_Clss } from "src/cultura/categorias-contrat-mancul/n_catgcont-m_espc/schemas/n_catgcont-m_espc.entity"
import { Nomencla_Categorias_ContratacionManifestacion_Especialidad } from "src/cultura/categorias-contrat-mancul/n_catgcont-m_espc/schemas/n_catgcont-m_espc.schema"
import { Nomenclador_Clasifica_ContratoTalento } from "src/cultura/codificadores-cult/enums/codificadores"
import { ApiPaginatedResponse } from "src/modules/common/doc/api-paginated-response.decorator"
import { Entity } from "src/modules/entity/domain/entities/entity.entity"
import { Create_Talento_Artistico_Dto } from "./create-talentos.dto"

export class Update_Talento_Artistico_Dto extends Create_Talento_Artistico_Dto{
    //id:string
     @IsOptional()
     @ApiProperty({example:'Pedro Prieto'})
    @IsString()
    @MinLength(3)
    nombre_TalentoArtistico :string

    //Nomencla_Categorias_ContratacionManifestacion_Clss.id
     @IsOptional()
     @ApiProperty({example:'666b7d6e80597b171ef1495d Danza Folklorica', type: 'ObjectID:Nomencla_Categorias_ContratacionManifestacion_Especialidad'})
    @IsMongoId()
    @IsNotEmpty({message:'NO vacio'})
    manifest_esp:string
       
    @IsOptional()
    @ApiProperty({  default:true, description:'esto es para pensar' })
    persona_Talento_Artistico:boolean

    //Nomenclador_Clasifica_ContratoTalento
    @IsOptional()
    @ApiProperty({  
        default:'A',
        type: String,
        enum:Object.keys(Nomenclador_Clasifica_ContratoTalento) })
    contrato_talento:string
    
    //Entity
    @IsOptional()
    @ApiProperty({  type:'ObjectID.Entity' })
    @IsMongoId()
    entidad_talento:string

    @IsOptional()
    @ApiProperty({  default:false })
    isDeleted:boolean
    
    @IsOptional() 
    updatedAt: Date;
}