import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

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
  deleted: boolean = false;  
}
