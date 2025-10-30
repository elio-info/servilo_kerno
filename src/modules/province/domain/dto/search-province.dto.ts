import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class SearchProvinceDto  {
  
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  exactName: boolean=true;

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean = true;

}
