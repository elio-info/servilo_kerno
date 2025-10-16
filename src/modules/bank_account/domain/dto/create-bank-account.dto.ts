import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';

export class CreateBankAccountDto {
  @ApiProperty({ type: 'ObjectID.Entity' })
  @IsNotEmpty()
  @IsString()
  entity: string;
  @IsBoolean()
  isCard: boolean;
  @IsNotEmpty()
  @IsEnum(['CUP', 'MLC', 'CL'])
  accountType: string;
  @IsNotEmpty()
  @IsString()
  account: string;
  @IsNotEmpty()
  @IsString()
  titular: string;
  @IsNotEmpty()
  @IsString()
  bank: string;
  @IsNotEmpty()
  @IsString()
  agency: string;
  @IsNotEmpty()
  @IsString()
  subsidiary: string;
  @IsNotEmpty()
  @IsString()
  address: string;
  @ApiProperty({ type: 'ObjectID.Municipality' })
  @IsNotEmpty()
  @IsMongoId()
  @IsRelationShipWith(MunicipalityModel)
  municipality: string;
}
