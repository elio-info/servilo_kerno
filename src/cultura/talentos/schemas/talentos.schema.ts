import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { Document, Types } from "mongoose";
import { Nomencla_Categorias_ContratacionManifestacion_Especialidad } from "src/cultura/categorias-contrat-mancul/n_catgcont-m_espc/schemas/n_catgcont-m_espc.schema";
import { Nomenclador_Clasifica_ContratoTalento } from "src/cultura/codificadores-cult/enums/codificadores";
import { Entity } from "src/modules/entity/domain/entities/entity.entity";
import { EntityModel } from "src/modules/entity/infrastructure/entity.schema";
import { MunicipalityModel } from "src/modules/municipality/infrastructure/municipality.schema";


@Schema({
    timestamps:true,
    validateBeforeSave:true,
    collection:'Talento_Artistico'
})
export class Talento_Artistico_Model {
    _id: Types.ObjectId;    
    
    @Prop({ required:true    })
    nombre_Talento_Artistico :string
   
    @Prop({
        type: Types.ObjectId, ref: Nomencla_Categorias_ContratacionManifestacion_Especialidad.name
    })
    manifest_esp:Nomencla_Categorias_ContratacionManifestacion_Especialidad

    @Prop({  default:true })
    persona_TalentoArtistico:boolean

    @Prop({
        type: String, //
        enum: Object.keys(Nomenclador_Clasifica_ContratoTalento) ,
       default:Nomenclador_Clasifica_ContratoTalento.A
    })
    contrato_talento:string

    @IsOptional()
    @Prop({ type: Types.ObjectId, ref: EntityModel.name })
    @Type(() => EntityModel)
    entidad_talento:EntityModel

   
    @Prop({ type: Types.ObjectId, ref: MunicipalityModel.name })
    @Type(() => MunicipalityModel)
    municipio: MunicipalityModel;
    
    
     @Prop({  default:false })
    isDeleted:boolean

    @Prop({ default: Date.now })
    createdAt: Date;
  
    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const Talento_Artistico_Schema=
SchemaFactory.createForClass(Talento_Artistico_Model)

export type Talento_Artistico_Document =
Talento_Artistico_Model & Document