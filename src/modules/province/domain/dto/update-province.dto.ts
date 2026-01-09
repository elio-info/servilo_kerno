import { PartialType } from '@nestjs/mapped-types';
import { CreateProvinceDto } from './create-province.dto';
import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { ProvinceModel } from '../../infrastructure/province.schema';

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {
    @ApiProperty({ type: 'ObjectId.Province',
            example:'66763c9511dbc2cb96b53d4d' })
    @IsMongoId()
    @IsRelationShipWith(ProvinceModel)
    @IsNotEmpty()
    @IsString()
    id:string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsBoolean()
    isDeleted: boolean;
}
