import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { Timestamp } from "rxjs"
import { IsRelationShipWith } from "src/modules/common/decorators/validateIdExistence"
import { ProgramaSocial } from "../../prog_socl/schemas/prog_socl.schema"
import { ProgramaSocial_Entity } from "../../prog_socl/schemas/prog_socl.entity"


export class Create_ProgramaSocial_Especial_Dto {    
    @ApiProperty({
        example:'Folklorica', 
        description:'Nombre del Nomenclador  del Programa Social Especial:[Pape]=> Rosa '        
    })
    @IsNotEmpty({message:'El tipo de categoria no puede ser vacio.'})
    @IsString({message:'El nomenclador no puede ser numeral o caracter especial'})
    @MinLength(3)
    nombre_programasocial_especial :string

    @ApiProperty({ type:'ObjectId.ProgramaSocial', example: '666a2f9d001740325f7923d4' })
    @IsMongoId()
    @IsString({ message: 'The Id of the Manifestacion must be a String' })
    @IsRelationShipWith(ProgramaSocial)
    @IsNotEmpty({ message: 'The Province ID cannot be empty' })
    prog_socl: ProgramaSocial
       
    // @IsOptional()
    // @ApiProperty({
    //     example: false,
    //     description:'Solo Si o No',
    //     type:Boolean,
    //     default:false
    // })
    // @IsBoolean()
    // isDeleted:boolean
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
