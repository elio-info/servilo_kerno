import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"


export class Create_NomenclaCategorias_ContratacionManifestacion_Dto {    
    @ApiProperty({
        example:'Danza', 
        description:'Nombre del Nomenclador. Ej: música, danza, audio, transporte, luces, etc.'        
    })
    @IsNotEmpty({message:'El tipo de categoria no puede ser vacio.'})
    @IsString({message:'El nomenclador no puede ser numeral o caracter especial'})
    @MinLength(3)
    name :string

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
    apoyo_categoria_manifestacion:boolean=false
    
}
