import { PartialType } from '@nestjs/mapped-types';
import { CreateEntityTypeDto } from './create-entity-type.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, IsNotEmpty, IsInt, Min, MinLength } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { EntityTypeModel } from '../../infrastructure/entity-type.schema';

export class UpdateEntityTypeDto {
    @ApiProperty({
    example:`6669ff90079184e73863190a de Pinar del Rio`,
    required:true
    })
    @IsMongoId({message:'No es formato valido'})
    @IsString({ message: 'The Id of the tipo de entidad must be a String' })
    @IsRelationShipWith(EntityTypeModel)
    @IsNotEmpty({ message: 'The Municipality ID cannot be empty' })
    id: string;  

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    name: string;
    @IsInt()
    @Min(0)
    hierarchy: number;

    
}
