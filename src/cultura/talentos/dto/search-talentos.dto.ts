import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNotEmpty, IsString, MinLength, IsBoolean, IsMongoId } from "class-validator";
import { NomenclaCategorias_ContManifestacion_Especialidad_Model } from "src/cultura/categorias-contrat-mancul/n_catgcont-m_espc/schemas/n_catgcont-m_espc.schema";
import { Nomenclador_Clasifica_ContratoTalento } from "src/cultura/codificadores-cult/enums/codificadores";
import { IsRelationShipWith } from "src/modules/common/decorators/validateIdExistence";
import { EntityModel } from "src/modules/entity/infrastructure/entity.schema";

export class Search_Talentos_Artisticos_Dto  {
        
    @ApiProperty({
        example:'Pape', 
        description:'Nombre del Nomenclador especialidad que depende del ProgramaSocial especialidal.'        
    })
    @IsOptional()
    @IsNotEmpty({message:'El tipo de categoria no puede ser vacio.'})
    @IsString({message:'El nomenclador no puede ser numeral o caracter especial'})
    @MinLength(3)
    name? :string

    @IsOptional()
    @ApiProperty({
        example: false,
        description:'Solo Si o No',
        type:Boolean,
        default:false
    })
    @IsBoolean()
    isDeleted?:boolean
     
    @IsOptional()
    @IsBoolean()
    exactName: boolean=true; 

     @IsOptional()
    @ApiProperty({example:'666b7d6e80597b171ef1495d Danza Folklorica'})
    @IsMongoId()
    @IsNotEmpty({message:'NO vacio'})
    @IsRelationShipWith(NomenclaCategorias_ContManifestacion_Especialidad_Model)
    manifest_esp:string
       
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

}
