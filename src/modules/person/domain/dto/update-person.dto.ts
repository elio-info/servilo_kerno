import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';
import { PersonModel } from '../../infrastructure/person.schema';
import { IsMongoId, IsString, IsNotEmpty, IsBoolean, IsEmail, IsEnum, IsNumberString, IsObject, IsOptional, IsPhoneNumber, IsStrongPassword, MaxLength, MinLength, NotEquals, ValidateIf } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { ApiHideProperty } from '@nestjs/swagger';
import { Charge_Entity } from 'src/modules/charge/domain/entities/charge.entity';
import { EntityModel } from 'src/modules/entity/infrastructure/entity.schema';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';

export class UpdatePersonDto {
    
    @IsMongoId({message:'No es formato valido'})
    @IsString({ message: 'The Id of the place must be a String' })
    @IsRelationShipWith(PersonModel)
    @IsNotEmpty({ message: 'The Place ID cannot be empty' })
    id: string;

    @IsString()
      @IsNotEmpty()
      name?: string;
    
      @IsString()
      @IsNotEmpty()
      lastName1: string;
    
      @IsString()
      @IsNotEmpty()
      lastName2?: string;
    
      @IsNotEmpty() //TODO make custom validation for CI
      @MaxLength(11)
      @MinLength(11)
      @IsNumberString()
      ci?: string;
    
      @IsString()
      @IsNotEmpty()
      @IsEmail()
      email?: string;
    
      @IsEnum(['Blanco', 'Negro', 'Mestizo', 'Amarillo'])
      @IsOptional()
      skinColor?: string='Mestizo';
    
      @IsPhoneNumber()
      @IsOptional()
      phone: string;
    
      @IsBoolean()
      @NotEquals(null)
      @ValidateIf((object, value) => value !== undefined)
      isActive?: boolean;
    
      @IsString()
      @IsNotEmpty()
      username?: string;
    
      @IsString()
      address?: string;
    
      @IsString()
      image?: string;
    
      @IsString()
      gender?: string;
    
      @IsBoolean()
      passwordMustChange?: boolean;
    
      @IsStrongPassword()
      password: string;
    
      @IsString()
      @IsRelationShipWith(MunicipalityModel)
      @IsNotEmpty()
      municipality?: string;
    
      @IsObject()
      // @IsRelationShipWith(ChargeModel)
      @IsNotEmpty()
      charge?: Charge_Entity;
    
      @IsOptional()
      @IsRelationShipWith(EntityModel)
      entity?: string;
    
      @IsEnum(['ADMIN','IM'])
      @IsNotEmpty()
      role?: string;
      
    
      @ApiHideProperty()
      hashPassword?: string;

}
