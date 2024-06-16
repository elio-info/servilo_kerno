import { IsInt, IsNotEmpty, IsString, MinLength, Min } from 'class-validator';

export class SearchEntityTypeDto {
  constructor() {
    this.name = '';
  }
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;
  @IsInt()
  @Min(0)
  hierarchy: number;
}
