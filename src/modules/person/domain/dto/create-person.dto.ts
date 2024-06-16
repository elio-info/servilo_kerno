import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  NotEquals,
  ValidateIf,
} from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { EntityModel } from 'src/modules/entity/infrastructure/entity.schema';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName1: string;

  @IsString()
  @IsNotEmpty()
  lastName2: string;

  @IsNotEmpty() //TODO make custom validation for CI
  @MaxLength(11)
  @MinLength(11)
  @IsNumberString()
  ci: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  skinColor: string;

  @IsPhoneNumber()
  phone: string;

  @IsBoolean()
  @NotEquals(null)
  @ValidateIf((object, value) => value !== undefined)
  isActive: boolean;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  address: string;

  @IsString()
  image: string;

  @IsString()
  gender: string;

  @IsBoolean()
  passwordMustChange: boolean;

  @IsStrongPassword()
  password: string;

  @ApiProperty({ type: 'ObjectID.Municipality' })
  @IsString()
  @IsRelationShipWith(MunicipalityModel)
  @IsNotEmpty()
  municipality: string;

  @ApiProperty({ type: 'ObjectID.Entity' })
  @IsOptional()
  @IsRelationShipWith(EntityModel)
  entity: string;

  @IsEnum(['ADMIN'])
  @IsNotEmpty()
  role: string;

  @ApiHideProperty()
  hashPassword: string;
}
