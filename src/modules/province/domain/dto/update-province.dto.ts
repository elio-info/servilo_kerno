import { PartialType } from '@nestjs/mapped-types';
import { CreateProvinceDto } from './create-province.dto';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsBoolean()
    isDeleted: boolean;
}
