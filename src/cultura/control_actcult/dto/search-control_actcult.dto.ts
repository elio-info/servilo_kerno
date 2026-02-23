import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Create_CActCult_Dto } from './create-control_actcult.dto';
import { Control_ActividadCultural_Model } from '../schemas/control_actcult.schema';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { EntityModel } from 'src/modules/entity/infrastructure/entity.schema';

export class Search_CActCult_Dto {
    @IsString()
    name?:string

    @IsBoolean()
    exacName?:boolean=true

    // @ApiProperty({required:true})
    @IsRelationShipWith(EntityModel)
    @IsNotEmpty()
    @IsMongoId()
    entidad_responsable?:string

    // @ApiProperty({required:true})
    // @IsRelationShipWith(ProgramaSocial_Model)
    @IsNotEmpty()
    // @IsMongoId()
    @IsArray()
    programas?:string[]   
}
