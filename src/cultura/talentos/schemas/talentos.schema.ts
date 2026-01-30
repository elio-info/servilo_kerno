import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { NomenclaCategorias_ContManifestacion_Especialidad_Model } from "src/cultura/categorias-contrat-mancul/n_catgcont-m_espc/schemas/n_catgcont-m_espc.schema";
import { Nomenclador_Clasifica_ContratoTalento } from "src/cultura/codificadores-cult/enums/codificadores";
import { Entity_Entity } from "src/modules/entity/domain/entities/entity.entity";


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
        type: Types.ObjectId, ref: NomenclaCategorias_ContManifestacion_Especialidad_Model.name
    })
    manifest_esp:NomenclaCategorias_ContManifestacion_Especialidad_Model

    @Prop({  default:true })
    persona_TalentoArtistico:boolean

    @Prop({
        type: String, //
        enum: Object.keys(Nomenclador_Clasifica_ContratoTalento) ,
       default:Nomenclador_Clasifica_ContratoTalento.A
    })
    contrato_talento:string

    @Prop({
        type: Types.ObjectId, ref: Entity_Entity.name
    })
    entidad_talento:NomenclaCategorias_ContManifestacion_Especialidad_Model

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