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
export class M1_Reports_CActCult_DTO {
    
    @ApiProperty({
        example:'Fecha de la actividad',
        required:true,
        minLength:10,
        maxLength:10
    })
    // @IsOptional()
    @IsNotEmpty()
    @IsString()
    dia_actcult:string   

    // @IsOptional()
    @ApiProperty({
        example:'yyyy-mm-dd',
        maxLength:10,
        minLength:10,
        required:true
    })
    @IsNotEmpty()
    @IsString()
    findia_actcult:string

    // @ApiProperty({required:false})
    @IsRelationShipWith(EntityModel)
    @IsNotEmpty()
    @IsMongoId()
    entidad_responsable:string

    @IsOptional()
    @IsBoolean()
    isDeleted:boolean=false 
}