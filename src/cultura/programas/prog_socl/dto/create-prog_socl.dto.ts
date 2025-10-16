import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Timestamp } from "rxjs"


export class Create_ProgramaSocial_Dto {

    
    @ApiProperty({
        example:'Bellezas', 
        description:'Nombre del programa social.'        
    })
    @IsNotEmpty({message:'El tipo de categoria no puede ser vacio.'})
    @IsString({message:'El nomenclador no puede ser numeral o caracter especial'})
    readonly nombre_programasocial :string

    @ApiProperty({
        example: true,
        description: `Que sea priorizado o no: 
                          <br>  Si: priorizado 
                          <br>  No: provincial                         
                        <br>  Este campo es Verdadero por defecto.                                          
                        `
    })    
    @IsOptional()
    @IsBoolean({
        message:'Solo Si o No'
    })
    priorizado:boolean
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
