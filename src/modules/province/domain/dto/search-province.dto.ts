import { ApiOperation } from '@nestjs/swagger';
import { IsBoolean, isMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { isValidObjectId } from 'mongoose';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { ProvinceModel } from '../../infrastructure/province.schema';

export class SearchProvinceDto  {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  exactName: boolean=true;

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean = false;  
}
