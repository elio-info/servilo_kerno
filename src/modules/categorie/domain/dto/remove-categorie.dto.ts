import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { CategorieModel } from '../../infrastructure/categorie.schema';

export class RemoveCategorieDto {
  @IsMongoId()
  @IsString({ message: 'The Id of a String' })
  @IsRelationShipWith(CategorieModel)
  @IsNotEmpty({ message: 'The ID cannot be empty' }) 
  @Type(()=>CategorieModel) 
  id:string;

}

