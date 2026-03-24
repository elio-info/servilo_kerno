import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Nomenclador_GrupoEtareo, Nomenclador_EstadosDeActividadCultural } from "src/cultura/codificadores-cult/enums/codificadores";
import { Comunidad_Transformacion_Model } from "src/cultura/comun_transf/schemas/comun_transf.schema";
import { ConsejoPopular_Municipality_Model } from "src/cultura/consejo_popular/domain/schemas/consejo_popular.schema";
import { IsRelationShipWith } from "src/modules/common/decorators/validateIdExistence";
import { EntityModel } from "src/modules/entity/infrastructure/entity.schema";
import { PlaceModel } from "src/modules/place/infrastructure/place.schema";
export class ReportsBasic_CActCult_DTO {
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

  @ApiProperty({
        example:'20:06',
        maxLength:5,
        minLength:5,
        //nullable:true
    })
    @IsNotEmpty()
    @IsString()
    hora_actcult?:string  //Timestamp

    @IsOptional()
    @ApiProperty({
        example:'yyyy-mm-dd',
        maxLength:10,
        minLength:10,
        required:true
    })
    @IsNotEmpty()
    @IsString()
    findia_actcult?:string

    @IsOptional()
    @ApiProperty({
        example:'20:06',
        maxLength:5,
        minLength:5,
        //nullable:true
    })
    @IsNotEmpty()
    @IsString()
    finhora_actcult?:string  

    @ApiProperty({required:false})
    @IsRelationShipWith(EntityModel)
    @IsNotEmpty()
    @IsMongoId()
    entidad_responsable?:string

    @IsOptional()
    @IsRelationShipWith(PlaceModel)
    @IsMongoId()
    lugar_planificado?:string

    @IsOptional()
    @IsRelationShipWith(EntityModel)
    @IsMongoId()
    ic_planificado?:string

    @IsOptional()
    @IsRelationShipWith(ConsejoPopular_Municipality_Model)
    @IsMongoId()
    cp_planificado?:string

    @IsOptional()
    @IsRelationShipWith(Comunidad_Transformacion_Model)
    @IsMongoId()
    ct_planificado:string
    
    @ApiProperty({required:false})
    // @IsRelationShipWith(ProgramaSocial_Model)
    @IsNotEmpty()
     @IsMongoId()
    //@IsArray()
    programas_tributa?:string

    @IsOptional()
    @IsEnum(Nomenclador_GrupoEtareo)
    edad:string

    // @IsNumber()
    // @ApiProperty({required:true,type:Number})
    // @Min(1)
    // edad_asistencia:Number;
    
    @IsBoolean()
    @IsOptional()
    tipoActividad_extraPlan:boolean
    
    @IsOptional()
    @IsRelationShipWith(EntityModel)
    @IsMongoId()
    tipoActividad_Prov_Entidad:string //EntityModel
    
    @IsOptional()
    // @IsArray()
    @IsNotEmpty()
    estado_actividad:Nomenclador_EstadosDeActividadCultural
  
}