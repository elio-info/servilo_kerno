import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ObjectId } from 'mongoose';
import { Categorie_Entity } from 'src/modules/categorie/domain/entities/categorie.entity';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { EntityModel } from 'src/modules/entity/infrastructure/entity.schema';
import { ChargeModel } from '../../infrastructure/charge.schema';

export class FindChargeDto {
  @IsMongoId()
  @IsString({ message: 'The Id of a String' })
  @IsRelationShipWith(ChargeModel)
  @IsNotEmpty({ message: 'The ID cannot be empty' }) 
  @Type(()=>ChargeModel) 
  id?:string;

  @IsOptional()
  @IsNumber()  
  page: number;
  
  @IsOptional()
  @IsNumber()  
  pageSize: number;
  
}
