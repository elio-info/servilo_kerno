import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export class ReportsBasic_DTO {
  @ApiProperty({
      example:'Fecha de la actividad',
      required:true,
      minLength:10,
      maxLength:10
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  dia_actcult:string   

  
}