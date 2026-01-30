import { IsMongoId, IsNotEmpty } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { EntityModel } from '../../infrastructure/entity.schema';

export class RemoveEntityDto  {
    @IsMongoId({ message: 'Entity Id must be valid' })
    @IsRelationShipWith(EntityModel)
    @IsNotEmpty({message:'NO se reconoce Id'})
    id: string;
}
