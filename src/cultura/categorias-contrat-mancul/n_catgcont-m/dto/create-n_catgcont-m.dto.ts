import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Timestamp } from "rxjs"


export class Create_Nomencla_CategoriasContratacionManifestacion_Dto {

    
    @ApiProperty({
        example:'Danza', 
        description:'Nombre del Nomenclador. Ej: música, danza, audio, transporte, luces, etc.'        
    })
    @IsNotEmpty({message:'El tipo de categoria no puede ser vacio.'})
    @IsString({message:'El nomenclador no puede ser numeral o caracter especial'})
    readonly nombre_categoria_manifestacion :string

    @ApiProperty({
        example: false,
        description: `Que sea de apoyo es que no sea de cultura propiamente: 
                          <br>  Si: luces, transporte 
                          <br>  No: danza, teatro                         
                        <br>  Este campo es Falso por defecto.                                          
                        `
    })    
    @IsOptional()
    @IsBoolean({
        message:'Solo Si o No'
    })
    apoyo_categoria_manifestacion:boolean
    /**
   * Date of this Information.
   * @example "1900-01-01T05:00:00.000+05:00"
   */
    // @IsOptional()
    // @IsDate()
    // createdAt:Date

    // @IsOptional()
    // @IsDate()
    // updatedAt:Date
}
