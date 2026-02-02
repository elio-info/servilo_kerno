import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsDate, MinLength, IsMongoId } from 'class-validator';
import { Create_ProgramaSocial_Especial_Dto } from './create-prog_socl_espc.dto';
import { ProgramaSocial_Priorizado_Model } from '../../prog_socl_prio/schemas/prog_socl_prio.schema';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { ProgramaSocial_Especial_Model } from '../schemas/prog_socl_espc.schema';

export class Search_ProgramaSocial_Especialidad_Dto  {
        
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
}
