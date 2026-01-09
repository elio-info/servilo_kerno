import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Timestamp } from "rxjs"


export class Create_ProgramaSocial_Dto {

    
    @ApiProperty({
        example:'Bellezas', 
        description:'Nombre del programa social.'        
    })
    @IsNotEmpty({message:'El nombre no puede ser vacio.'})
    @IsString({message:'El nomenclador no puede ser numeral o caracter especial'})
    nombre_programasocial :string
    
}
