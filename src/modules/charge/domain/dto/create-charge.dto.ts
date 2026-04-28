import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ObjectId } from 'mongoose';
import { Categorie_Entity } from 'src/modules/categorie/domain/entities/categorie.entity';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { EntityModel } from 'src/modules/entity/infrastructure/entity.schema';

export class CreateChargeDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsRelationShipWith(EntityModel)
  @IsMongoId()
  entity:string

  @IsArray({message:'no vacio'})
  @IsNotEmpty({message:'no vacio'})
  access: Categorie_Entity[]

  @IsArray()
  @ApiProperty({default:[]})
  // @IsNotEmpty({message:'no vacio'})
  @IsRelationShipWith(EntityModel)  
  subord: ObjectId[]
}
