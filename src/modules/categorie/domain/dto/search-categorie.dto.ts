import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SearchCategorieDto {
  constructor() {
    this.name = '';
  }
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;
}
