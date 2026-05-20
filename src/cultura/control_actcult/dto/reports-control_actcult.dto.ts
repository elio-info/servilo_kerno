import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Nomenclador_GrupoEtareo, Nomenclador_EstadosDeActividadCultural } from "src/cultura/codificadores-cult/enums/codificadores";
import { Comunidad_Transformacion_Model } from "src/cultura/comun_transf/schemas/comun_transf.schema";
import { ConsejoPopular_Municipality_Model } from "src/cultura/consejo_popular/domain/schemas/consejo_popular.schema";
import { IsRelationShipWith } from "src/modules/common/decorators/validateIdExistence";
import { EntityModel } from "src/modules/entity/infrastructure/entity.schema";
import { PlaceModel } from "src/modules/place/infrastructure/place.schema";
import { Control_ActividadCultural_Model } from "../schemas/control_actcult.schema";
import { ProgramaSocial_Model } from "src/cultura/programas/schemas/prog_socl.schema";
import { NomenclaCategorias_ContratacionManifestacion_Model } from "src/cultura/categorias-contrat-mancul/n_catgcont-m/schemas/n_catgcont-m.schema";
import { Proyecto_Sociocultural_Comunitario_Model } from "src/cultura/proy_soccult_com/schemas/proy_soccult_com.schema";
export class ReportsBasic_CActCult_DTO {
@IsOptional()
@ApiProperty({ 
    example:'665f7c4808023e4c264a4f9b',
    description:`Esta el la llave del Objeto que se trabajara en cuestion`
})
@IsMongoId()
@IsString()
@IsRelationShipWith(Control_ActividadCultural_Model)
@Type(()=> Control_ActividadCultural_Model)
id?:string

@IsOptional()
@ApiProperty({minLength:3})
@IsString()
name?:string

@IsOptional()
@IsBoolean()
exactName?:boolean
    
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
    
    
    @IsOptional()
    @IsRelationShipWith(Proyecto_Sociocultural_Comunitario_Model)
    @IsMongoId()
    ps_planificado:string
    
    @ApiProperty({required:false})
    @IsRelationShipWith(ProgramaSocial_Model)
    @IsNotEmpty()
    @IsMongoId()
    @IsOptional()
    programas_tributa?:string

    @IsOptional()
    @IsBoolean()
    principal:boolean=true

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
  
    @IsOptional()
    @IsMongoId()
    @IsRelationShipWith(NomenclaCategorias_ContratacionManifestacion_Model)
    @IsNotEmpty()
    manifestaciones_artisticas?:string

    @IsOptional()
    @IsBoolean()
    TV:boolean

    @IsOptional()
    @IsBoolean()
    redes_plataforma:boolean 

    @IsOptional()
    @IsBoolean()
    isDeleted:boolean=false 
}