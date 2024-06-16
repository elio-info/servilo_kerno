import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { Timestamp } from "rxjs"
import { Nomencla_Categorias_ContratacionManifestacion } from "../../n_catgcont-m/schemas/n_catgcont-m.schema"
import { IsRelationShipWith } from "src/modules/common/decorators/validateIdExistence"


export class Create_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto {    
    @ApiProperty({
        example:'Folklorica', 
        description:'Nombre del Nomenclador de la Especialidad de la Manifestacion:[Danza]=> Folklorica '        
    })
    @IsNotEmpty({message:'El tipo de categoria no puede ser vacio.'})
    @IsString({message:'El nomenclador no puede ser numeral o caracter especial'})
    @MinLength(3)
    nombre_categoria_manifestacion_especialidad :string

    @ApiProperty({ example: '666a2f9d001740325f7923d4' })
    @IsMongoId()
    @IsString({ message: 'The Id of the Manifestacion must be a String' })
    // @IsRelationShipWith(Nomencla_Categorias_ContratacionManifestacion)
    @IsNotEmpty({ message: 'The Province ID cannot be empty' })
    ID_categoria_manifestacion: string
       
    @IsOptional()
    @ApiProperty({
        example: false,
        description:'Solo Si o No',
        type:Boolean,
        default:false
    })
    @IsBoolean()
    isDeleted:boolean
    /**
   * Date of this Information.
   * @example "1900-01-01T05:00:00.000+05:00"
   
    @IsOptional()
    @IsDate()
    createdAt:Date
*/
    // @IsOptional()
    // @IsDate()
    // updatedAt:Date
}
