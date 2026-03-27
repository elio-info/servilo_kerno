import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { EntityTypeModel } from '../../infrastructure/entity-type.schema';

export class RemoveEntityTypeDto {
    
    @ApiProperty({
    example:`6669ff90079184e73863190a de Pinar del Rio`,
    required:true
    })
    @IsMongoId({message:'No es formato valido'})
    @IsString({ message: 'The Id of the tipo de entidad must be a String' })
    @IsRelationShipWith(EntityTypeModel)
    @IsNotEmpty({ message: 'The Municipality ID cannot be empty' })
    id: string;    
}
