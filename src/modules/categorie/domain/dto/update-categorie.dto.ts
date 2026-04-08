import { PartialType } from '@nestjs/mapped-types';
import { API_Struct_DTO, CreateCategorieDto } from './create-categorie.dto';
import { Type } from 'class-transformer';
import { IsString, MinLength, IsNotEmpty, IsArray, ValidateNested, IsOptional, IsMongoId } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { CategorieModel } from '../../infrastructure/categorie.schema';

export class UpdateCategorieDto extends PartialType(CreateCategorieDto) {
  @IsMongoId()
  @IsNotEmpty()
  @IsRelationShipWith(CategorieModel, { message: 'The provided id does not exist in the database' })
  id: string;
  
  @IsOptional()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

    @IsOptional()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  nameTitle: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  link: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(()=>API_Struct_DTO)
  access_point: API_Struct_DTO[];

}
