import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { ProgramaSocial_Priorizado_Model } from '../schemas/prog_socl_prio.schema';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';

export class Remove_ProgramaSocial_Priorizado_Dto  {
    @ApiProperty({
        example:'665f7c4808023e4c264a4f9b',
        description:`Esta el la llave del Objeto que se trabajara en cuestion`
    })
    @IsMongoId()
    @IsString()
    @IsRelationShipWith(ProgramaSocial_Priorizado_Model)
    @IsNotEmpty({message:'NO vacio'})
    id:string
        
}
