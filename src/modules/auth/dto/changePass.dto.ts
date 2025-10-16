import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class ChangePassDto {
  @IsStrongPassword()
  @IsNotEmpty()
  newPassword: string;

  @IsStrongPassword()
  @IsNotEmpty()
  oldPassword: string;
}
