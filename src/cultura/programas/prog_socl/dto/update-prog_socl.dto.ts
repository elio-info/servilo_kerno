import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Create_ProgramaSocial_Dto } from './create-prog_socl.dto';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsDate, isMongoId, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class Update_ProgramaSocial_Dto extends PartialType(Create_ProgramaSocial_Dto) {
    @ApiProperty({ type: Types.ObjectId,
        example:'665f7c4808023e4c264a4f9b',
        description:`Esta el la llave del Objeto que se trabajara en cuestion`
    })
    @IsMongoId()
    @IsString()
    _id:string
    
    
    @IsOptional()
    @ApiProperty({
        example:'Belleza', 
        description:'Nombre del Nomenclador. '        
    })@IsNotEmpty({message:'El tipo de categoria no puede ser vacio.'})
    @IsString({message:'El nomenclador no puede ser numeral o caracter especial'})
    nombre_programasocial :string

    
    // @IsOptional()
    // @ApiProperty({
    //     example: true,
    //     description: `Que sea de priorizado o provincial: 
    //                       <br>  Si: priorizado
    //                       <br>  No: provincial                         
    //                     <br>  Este campo es Falso por defecto.                                          
    //                     `
    // })@IsBoolean({
    //     message:'Solo Si o No'
    // })
    // priorizado:boolean
    
    @IsOptional()
    @IsDate()
    updatedAt: Date
}
