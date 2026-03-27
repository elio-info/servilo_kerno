import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsDate, MinLength, IsMongoId } from 'class-validator';
import { Create_ProgramaSocial_Especial_Dto } from './create-prog_socl_espc.dto';
import { ProgramaSocial_Priorizado_Model } from '../../prog_socl_prio/schemas/prog_socl_prio.schema';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { ProgramaSocial_Especial_Model } from '../schemas/prog_socl_espc.schema';

export class Remove_ProgramaSocial_Especialidad_Dto  {
    @ApiProperty({
        example:'665f7c4808023e4c264a4f9b',
        description:`Esta el la llave del Objeto que se trabajara en cuestion`
    })
    @IsMongoId()
    @IsString()
    @IsRelationShipWith(ProgramaSocial_Especial_Model)
    @IsNotEmpty({message:'NO vacio'})
    id:string
        
}
