import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Clasifica_Nivel_EntidadCultural } from 'src/cultura/codificadores-cult/enums/codificadores';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { EntityTypeModel } from 'src/modules/entity_type/infrastructure/entity-type.schema';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';
import { PlaceModel } from 'src/modules/place/infrastructure/places.schema';

export class CreateEntityDto {
  @ApiProperty({ 
    type: 'ObjectID.EntityType',
    description:'Tipo de entidad:EC, AC, IC, etc',
    example:'666a1adcae9360d13df5741b (que es una Empresa Cultural)'
   })
  @IsMongoId({ message: 'Entity Type Id must be valid' })
  @IsRelationShipWith(EntityTypeModel)
  entityType: string;

  
  @ApiProperty({ type: 'ObjectID.Entity',
    description:'[opcional] A quien se subordina:Entidad a quien se subordina: DPC Pinar del Rio(ejemplo)',
    example:'null'
   })
  @IsMongoId({ message: 'Parent Id must be valid' })
  @IsOptional()
  parentId?: string;

  
  @ApiProperty({ type: String,
    description:'Nombre de la Entidad: DPC Pinar del Rio(ejemplo)',
    example:'DMC la Palma'
   })
  @IsString()
  @MinLength(3)
  @MaxLength(64)
  @IsNotEmpty()
  name: string;

  
  @ApiProperty({ 
    type: String, 
    description:'[Opcional] Nivel al que se encuentra la entidad. Nomenclador Clasifica_Nivel_EntidadCultural',
    enum:Object.keys(Clasifica_Nivel_EntidadCultural),
    default:Clasifica_Nivel_EntidadCultural.Mnpl,
    example: 'Mnpl'
   })
  @IsOptional()
  nivel?: string;


  @ApiProperty({
    description: '[Opcional]'
  })
  @IsString()
  @MinLength(6)
  @IsOptional()
  nitCode: string;

  
  @ApiProperty({
    description: '[Opcional]'
  })
  @IsString()
  @MaxLength(10)
  @IsOptional()
  abbreviation: string;

  
  @ApiProperty({
    description: '[Opcional]'
  })
  @IsString()
  @MaxLength(64)
  @IsOptional()
  resolution: string;

  
  @ApiProperty({
    description: '[Opcional]'
  })
  @IsDateString()
  @IsOptional()
  resolutionDate: Date;

  
  @ApiProperty({
    description: '[Opcional]'
  })
  @IsString()
  @IsOptional()
  issuedBy: string;

  
  @ApiProperty({
    description: '[Opcional]'
  })
  @IsString()
  @IsOptional()
  domicilie: string;

  @ApiProperty({ 
    type: 'ObjectID.Municipality' , 
    description:'[opcional] Municipio en donde esta.',
    example:'666a00f24d1a4ab9cb5d8e27 (Pinar del Rio)'
  })
  @IsMongoId({ message: 'Municipality Id must be valid' })
  @IsOptional()
  @IsRelationShipWith(MunicipalityModel)
  municipality: string;

  @ApiProperty({ 
    type: 'ObjectID.Place',
    description:'[Opcional] Lugar donde esta'
   })
  @IsMongoId({ message: 'Place Id must be valid' })
  @IsOptional()
  @IsRelationShipWith(PlaceModel)
  place: string;

  
  @ApiProperty({
    description: '[Opcional]'
  })
  @IsString()
  @MaxLength(20)
  @IsOptional()
  reeup: string;

  
  @ApiProperty({
    description: '[Opcional]'
  })
  @IsString()
  @IsOptional()
  commercialRegister: string;
}
