import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { NomenclaCat_ContManifestacion_Especialidad_Entity } from "src/cultura/categorias-contrat-mancul/n_catgcont-m_espc/schemas/n_catgcont-m_espc.entity"
import { NomenclaCategorias_ContManifestacion_Especialidad_Model } from "src/cultura/categorias-contrat-mancul/n_catgcont-m_espc/schemas/n_catgcont-m_espc.schema"
import { Nomenclador_Clasifica_ContratoTalento } from "src/cultura/codificadores-cult/enums/codificadores"
import { ApiPaginatedResponse } from "src/modules/common/doc/api-paginated-response.decorator"
import { Entity_Entity } from "src/modules/entity/domain/entities/entity.entity"

export class Create_Talento_Artistico_Dto{
    //id:string
    @ApiProperty({example:'Pedro Prieto'})
    @IsString()
    @MinLength(3)
    nombre_Talento_Artistico :string

    //Nomencla_Categorias_ContratacionManifestacion_Clss.id
    @ApiProperty({example:'666b7d6e80597b171ef1495d Danza Folklorica'})
    @IsMongoId()
    @IsNotEmpty({message:'NO vacio'})
    manifest_esp:string
       
    @ApiProperty({  default:true, description:'esto es para pensar' })
    persona_Talento_Artistico:boolean

    //Nomenclador_Clasifica_ContratoTalento
    @ApiProperty({  default:Nomenclador_Clasifica_ContratoTalento.A,
        type:String,
        enum: Object.keys(Nomenclador_Clasifica_ContratoTalento)  })
    @IsEnum(Nomenclador_Clasifica_ContratoTalento)
    contrato_talento:string
    //Entity
    @ApiProperty({  example:'666c39bd57d4be9254cb5741' })
    @IsMongoId()
    entidad_talento:string

    @ApiProperty({  default:false })
    @IsOptional()
    isDeleted:boolean

    @IsOptional()
    createdAt: Date; 
    @IsOptional() 
    updatedAt: Date;
}