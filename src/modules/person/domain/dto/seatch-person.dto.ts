import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { EntityModel } from 'src/modules/entity/infrastructure/entity.schema';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';

export class SearchPersonDto {
  constructor() {
    this.name = '';
    this.lastName1 = '';
    this.lastName2 = '';
    this.ci = '';
    this.email = '';
    this.skinColor = '';
    this.phone = '';
    this.username = '';
    this.address = '';
    this.gender = '';
    this.municipality = '';
  }
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
  @IsOptional()
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

  @ApiProperty({ type: 'ObjectID.Entity' })
  @IsOptional()
  @IsRelationShipWith(EntityModel)
  entity: string;

  @IsEnum(['ADMIN'])
  @IsNotEmpty()
  role: string;

  @ApiProperty({ type: 'ObjectID.Municipality' })
  @IsString()
  @IsRelationShipWith(MunicipalityModel)
  @IsNotEmpty()
  municipality: string;

  @ApiHideProperty()
  hashPassword: string;
}
