import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsDate, MinLength, IsMongoId } from 'class-validator';
import { Create_ProgramaSocial_Especial_Dto } from './create-prog_socl_espc.dto';
import { ProgramaSocial } from '../../prog_socl/schemas/prog_socl.schema';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';

export class Update_ProgramaSocial_Especialidad_Dto extends PartialType(Create_ProgramaSocial_Especial_Dto) {
    // @ApiProperty({
    //     example:'665f7c4808023e4c264a4f9b',
    //     description:`Esta el la llave del Objeto que se trabajara en cuestion`
    // })
    // @IsString()
    // _id:string
    
    @ApiProperty({
        example:'Pape', 
        description:'Nombre del Nomenclador especialidad que depende del ProgramaSocial especialidal.'        
    })
    @IsOptional()
    @IsNotEmpty({message:'El tipo de categoria no puede ser vacio.'})
    @IsString({message:'El nomenclador no puede ser numeral o caracter especial'})
    @MinLength(3)
    nombre_programasocial_especial :string

    @ApiProperty({type:'ObjectId.ProgramaSocial', example: '666a2f9d001740325f7923d4' })
    @IsMongoId()
    @IsString({ message: 'The Id of the Manifestacion must be a String' })
    @IsRelationShipWith(ProgramaSocial)
    @IsNotEmpty({ message: 'The Province ID cannot be empty' })
    prog_socl: ProgramaSocial

    @IsOptional()
    @ApiProperty({
        example: false,
        description:'Solo Si o No',
        type:Boolean,
        default:false
    })
    @IsBoolean()
    isDeleted:boolean
    
    @IsOptional()
    @IsDate()
    updatedAt: Date
}
