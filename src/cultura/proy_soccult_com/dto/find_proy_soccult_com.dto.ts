import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { Proyecto_Sociocultural_Comunitario_Entity } from '../schemas/proy_soccult_com.entity';

export class FindProyectoSocioculturalComunitarioDto {
  @IsMongoId()
  @IsString({ message: 'The Id of a String' })
  @IsRelationShipWith(Proyecto_Sociocultural_Comunitario_Entity)
  @IsNotEmpty({ message: 'The ID cannot be empty' }) 
  @Type(()=>Proyecto_Sociocultural_Comunitario_Entity) 
  id?:string;

  @IsOptional()
  @IsNumber()  
  page: number;
  
  @IsOptional()
  @IsNumber()  
  pageSize: number;
  
}

