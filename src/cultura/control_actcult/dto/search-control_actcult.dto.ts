import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Create_CActCult_Dto } from './create-control_actcult.dto';
import { Control_ActividadCultural_Model } from '../schemas/control_actcult.schema';
import { Type } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';

export class Search_CActCult_Dto {
    @IsString()
    name:string
       
}
