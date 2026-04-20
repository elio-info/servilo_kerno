import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Create_CActCult_Dto } from './create-control_actcult.dto';
import { Control_ActividadCultural_Model } from '../schemas/control_actcult.schema';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min, minLength } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { EntityModel } from 'src/modules/entity/infrastructure/entity.schema';
import { Nomenclador_EstadosDeActividadCultural, Nomenclador_GrupoEtareo } from 'src/cultura/codificadores-cult/enums/codificadores';
import { Comunidad_Transformacion_Model } from 'src/cultura/comun_transf/schemas/comun_transf.schema';
import { ConsejoPopular_Municipality_Model } from 'src/cultura/consejo_popular/domain/schemas/consejo_popular.schema';
import { Talento_Artistico_Contratado_Entity } from 'src/cultura/talentos/talento_contratado/talento_contratado.entity';
import { PlaceModel } from 'src/modules/place/infrastructure/place.schema';
import { Estado_ActividadCultural } from '../schemas/control_actcult.entity';
import { ProgramaSocial_Model } from 'src/cultura/programas/schemas/prog_socl.schema';
import { NomenclaCategorias_ContratacionManifestacion_Model } from 'src/cultura/categorias-contrat-mancul/n_catgcont-m/schemas/n_catgcont-m.schema';

export class Search_CActCult_Dto {
    @IsNumber()
    page:number=1

    @IsNumber()
    pageSize:number=15

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
        example:'false: por defecto.si es recuperacion de informacion'        
    })    
    
    @ApiProperty({
        example:'yyyy-mm-dd',
        maxLength:10,
        minLength:10,
        required:true
    })
    @IsNotEmpty()
    @IsString()
    dia_actcult?:string

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
    @ApiProperty({required:false})
    @IsRelationShipWith(ProgramaSocial_Model)
    @IsNotEmpty()
    @IsMongoId()
    programas_tributa?:string

    @IsOptional()
    @IsBoolean()
    principal:boolean=true

    @IsOptional()
    @IsEnum(Nomenclador_GrupoEtareo)
    edad:string

    @IsBoolean()
    @IsOptional()
    tipoActividad_extraPlan:boolean
    
    @IsOptional()
    @IsRelationShipWith(EntityModel)
    @IsMongoId()
    tipoActividad_Prov_Entidad:string //EntityModel
    
    @IsOptional()
    estado_actividad:Nomenclador_EstadosDeActividadCultural

    @IsOptional()
    @IsMongoId()
    @IsRelationShipWith(NomenclaCategorias_ContratacionManifestacion_Model)
    @IsNotEmpty()
    manifestaciones_artisticas?:string
  /*  
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
*/
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
