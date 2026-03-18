import { ApiProperty } from "@nestjs/swagger"
import { IsRelationShipWith } from "src/modules/common/decorators/validateIdExistence"
import { EntityModel } from "src/modules/entity/infrastructure/entity.schema"
import { IsArray, IsBoolean, IsDate, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"
import { Talento_Artistico_Contratado_Entity } from "src/cultura/talentos/talento_contratado/talento_contratado.entity"
import { PlaceModel } from "src/modules/place/infrastructure/place.schema"
import { ConsejoPopular_Municipality_Model } from "src/cultura/consejo_popular/domain/schemas/consejo_popular.schema"
import { Comunidad_Transformacion_Model } from "src/cultura/comun_transf/schemas/comun_transf.schema"
import { Estado_ActividadCultural } from "../schemas/control_actcult.entity"
import { Nomenclador_GrupoEtareo } from "src/cultura/codificadores-cult/enums/codificadores"

export class Create_CActCult_Dto {
    @ApiProperty({
        example:'Dia de los bebes',
        required:true,
        minLength:3,
        type:String
    })
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({
        example:'yyyy-mm-dd',
        maxLength:10,
        minLength:10,
        required:true
    })
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
    hora_actcult:string  //Timestamp

    @IsDate()
    @IsOptional()
    dateAt:Date

    @ApiProperty({required:true})
    @IsRelationShipWith(EntityModel)
    @IsNotEmpty()
    @IsMongoId()
    entidad_responsable:string

    @IsOptional()
    @IsRelationShipWith(PlaceModel)
    @IsMongoId()
    lugar_planificado:string

    @IsOptional()
    @IsRelationShipWith(EntityModel)
    @IsMongoId()
    ic_planificado:string

    @IsOptional()
    @IsRelationShipWith(ConsejoPopular_Municipality_Model)
    @IsMongoId()
    cp_planificado:string

    @IsOptional()
    @IsRelationShipWith(Comunidad_Transformacion_Model)
    @IsMongoId()
    ct_planificado:string
    
    @ApiProperty({required:true})
    // @IsRelationShipWith(ProgramaSocial_Model)
    @IsNotEmpty()
    // @IsMongoId()
    @IsArray()
    programas_tributa:string[]

    // @IsOptional()
    @IsEnum(Nomenclador_GrupoEtareo)
    edad:string

    @IsNumber()
    @ApiProperty({required:true,type:Number})
    @Min(1)
    edad_asistencia:Number;
    
    @IsBoolean()
    tipoActividad_extraPlan:boolean=false
    
    @IsOptional()
    @IsRelationShipWith(EntityModel)
    @IsMongoId()
    tipoActividad_Prov_Entidad:string=null //EntityModel
    
    @IsArray()
    @IsNotEmpty()
   estados_actividad:Estado_ActividadCultural[]

   @IsArray()
    @IsNotEmpty()
    manifestaciones_artisticas:string[]
/////////////////
    @ApiProperty({example:` '[Talento_Artistico]'
        [
    Talento_Artistico_Contratado_Entity {
    id:string
    name :string
    manifest:string
    numero_contrato:string
    numero_prefactura:string
    cantidad:number
    }   
    ]` })
    @IsArray()
    @IsNotEmpty()
    talentos:Talento_Artistico_Contratado_Entity[]

    @ApiProperty({example:` '[Talento_Artistico]'
        [
    Talento_Artistico_Contratado_Entity {
    id:string
    name :string
    manifest:string
    numero_contrato:string
    numero_prefactura:string
    cantidad:number
    }   
    ]` })
    @IsArray()
    @IsNotEmpty()
    apoyos?:Talento_Artistico_Contratado_Entity[]

    @IsOptional()
    @IsBoolean()
    TV:boolean=false

    @IsOptional()
    @IsBoolean()
    redes_plataforma:boolean=false
}
