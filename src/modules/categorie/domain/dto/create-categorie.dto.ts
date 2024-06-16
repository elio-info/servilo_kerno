import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategorieDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;
}
