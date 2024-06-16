import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SearchProvinceDto {
  constructor() {
    this.name = '';
    //this.isDeleted=true
  }
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

}
