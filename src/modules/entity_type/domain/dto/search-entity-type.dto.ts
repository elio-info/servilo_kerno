import { IsInt, IsNotEmpty, IsString, MinLength, Min, IsBoolean } from 'class-validator';

export class SearchEntityTypeDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name?: string;
  @IsInt()
  @Min(0)
  hierarchy?: number;
  @IsBoolean()
  exactName?:boolean=true
  @IsBoolean()
  deleted?:boolean=false
}
