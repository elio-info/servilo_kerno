import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Timestamp } from "rxjs"
import { IsRelationShipWith } from "src/modules/common/decorators/validateIdExistence"
import { ProgramaSocial_Model } from "../schemas/prog_socl.schema"


export class Create_ProgramaSocial_Dto {    
    @ApiProperty({
        example:'Bellezas latinas', 
        description:'Nombre del programa social prio.'        
    })
    @IsNotEmpty({message:'El nombre no puede ser vacio.'})
    @IsString({message:'El nomenclador no puede ser numeral o caracter especial'})
    name :string

    @IsOptional()
    @IsBoolean()
    priorizado:Boolean

    @IsMongoId({message:'Se refiere un programa'})
    @IsRelationShipWith(ProgramaSocial_Model)
    @IsOptional()
    programa?:string
}
