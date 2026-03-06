import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Create_ProgramaSocial_Dto } from './create-progsocl.dto';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsDate, isMongoId, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { ProgramaSocial_Model } from '../schemas/prog_socl.schema';

export class Update_ProgramaSocial_Dto  {
    @ApiProperty({ type: Types.ObjectId,
        example:'665f7c4808023e4c264a4f9b',
        description:`Esta el la llave del Objeto que se trabajara en cuestion`
    })
    @IsMongoId()
    @IsString()
    @IsRelationShipWith(ProgramaSocial_Model)
    id:string
    
    
    @IsOptional()
    @ApiProperty({
        example:'Belleza', 
        description:'Nombre del Nomenclador. '        
    })
    @IsNotEmpty({message:'El tipo de categoria no puede ser vacio.'})
    @IsString({message:'El nomenclador no puede ser numeral o caracter especial'})
    name :string

    @IsOptional()
    @IsBoolean()
    priorizado:Boolean

    @IsMongoId({message:'Se refiere un programa'})
    @IsRelationShipWith(ProgramaSocial_Model)
    @IsOptional()
    programa?:string
 
    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean
}
