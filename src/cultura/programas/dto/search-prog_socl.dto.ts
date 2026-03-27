import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, MinLength, IsMongoId } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { ProgramaSocial_Model } from '../schemas/prog_socl.schema';

export class Search_ProgramaSocial_Dto  {
        
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
    isDeleted?:boolean=false
     
    @IsOptional()
    @IsBoolean()
    exactName?: boolean=true; 

    @IsOptional()
    @IsBoolean()
    @ApiProperty({
        example: false,
        description:'Solo Si o No',
        type:Boolean,
        default:false
    })
    priorizado:Boolean=false

    @IsMongoId({message:'Se refiere un programa'})
    @IsRelationShipWith(ProgramaSocial_Model)
    @IsOptional()
    programa?:string
}
