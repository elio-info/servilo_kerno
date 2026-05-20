import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ObjectId } from 'mongoose';
import { Categorie_Entity } from 'src/modules/categorie/domain/entities/categorie.entity';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { EntityModel } from 'src/modules/entity/infrastructure/entity.schema';

export class SearchChargeDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  
  @IsOptional()
  // @IsArray()
  @ApiProperty({default:[]})
  @IsNotEmpty({message:'no vacio'})
  @IsRelationShipWith(EntityModel)  
  subord: ObjectId
}
