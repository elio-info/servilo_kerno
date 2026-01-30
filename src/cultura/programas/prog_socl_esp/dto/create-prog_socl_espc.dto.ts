import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { Timestamp } from "rxjs"
import { IsRelationShipWith } from "src/modules/common/decorators/validateIdExistence"
import { ProgramaSocial_Priorizado } from "../../prog_socl_prio/schemas/prog_socl.schema"
import { ProgramaSocial_Entity } from "../../prog_socl_prio/schemas/prog_socl.entity"


export class Create_ProgramaSocial_Especial_Dto {    
    @ApiProperty({
        example:'Cuida a tu hijo', 
        description:'Nombre del Nomenclador  del Programa Social Especial '        
    })
    @IsNotEmpty({message:'El tipo de categoria no puede ser vacio.'})
    @IsString({message:'El nomenclador no puede ser numeral o caracter especial'})
    @MinLength(3)
    name :string

    
}
