import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateChargeDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;
}
