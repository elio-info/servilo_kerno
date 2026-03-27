import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateProvinceDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;  
}

