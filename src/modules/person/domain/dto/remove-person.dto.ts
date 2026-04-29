import { IsMongoId, IsString, IsNotEmpty } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { PersonModel } from '../../infrastructure/person.schema';

export class RemovePersonDto {
     @IsMongoId({message:'No es formato valido'})
    @IsString({ message: 'The Id of the place must be a String' })
    @IsRelationShipWith(PersonModel)
    @IsNotEmpty({ message: 'The Place ID cannot be empty' })
    id: string;

}