import { PartialType } from '@nestjs/mapped-types';
import { CreateChargeDto } from './create-charge.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty, IsMongoId, IsArray, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';
import { Categorie_Entity } from 'src/modules/categorie/domain/entities/categorie.entity';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { EntityModel } from 'src/modules/entity/infrastructure/entity.schema';
import { ChargeModel } from '../../infrastructure/charge.schema';
import { Type } from 'class-transformer';

export class DeleteChargeDto {
    @IsMongoId()
    @IsString({ message: 'The Id of a String' })
    @IsRelationShipWith(ChargeModel)
    @IsNotEmpty({ message: 'The ID cannot be empty' }) 
    @Type(()=>ChargeModel) 
    id:string;
   
}
