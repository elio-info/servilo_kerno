import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsString, MinLength, ValidateNested } from 'class-validator';
import { API_Struct } from '../entities/categorie.entity';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategorieDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  nameTitle: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  link: string;

  @IsArray()
  @ValidateNested({each: true})
  @Type(()=>API_Struct_DTO)
  access_point: API_Struct_DTO[];

}

export class API_Struct_DTO{
  @IsEnum(['Post', 'Delete' , 'Put', 'Get' , 'Patch'])
  nameAPI: string;//post,get,put,etc

  @IsString()
  @IsNotEmpty()
	linkAPI: string;// dcc
  
	@IsString()
  @IsNotEmpty()
	nameMenuTitle: string;// nombre

  @IsBoolean()
  // @ApiProperty({s:false || true})
	isActive: boolean=false;// si / no
}
