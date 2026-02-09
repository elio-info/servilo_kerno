import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Create_CActCult_Dto } from './create-control_actcult.dto';
import { Control_ActividadCultural_Model } from '../schemas/control_actcult.schema';
import { Type } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';

export class Remove_CActCult_Dto {
     @ApiProperty({ 
        example:'665f7c4808023e4c264a4f9b',
        description:`Esta el la llave del Objeto que se trabajara en cuestion`
    })
    @IsMongoId()
    @IsString()
    @IsRelationShipWith(Control_ActividadCultural_Model)
    @Type(()=> Control_ActividadCultural_Model)
    id:string
       
}
