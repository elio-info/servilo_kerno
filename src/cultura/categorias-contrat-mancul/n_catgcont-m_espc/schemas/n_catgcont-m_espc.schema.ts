import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, HydratedDocument, Types } from "mongoose";
import { NomenclaCategorias_ContratacionManifestacion_Model } from "../../n_catgcont-m/schemas/n_catgcont-m.schema";
import { IsOptional } from "class-validator";
import { Type } from "class-transformer";

@Schema({
    timestamps:true,
    validateBeforeSave:true,
    collection:'nomenclacategorias_contmanifest_especialidad'
})
export class NomenclaCategorias_ContManifestacion_Especialidad_Model {
    _id: Types.ObjectId;
    
    @ApiProperty({
        type:String,
        description:'Nombre del Nomenclador del tipo de especialidad dentro de la Manifestacion'
    })
    @Prop({
        required:true,
        unique: true
    })
    name :string

    @Prop({
        type: Types.ObjectId,
        ref: NomenclaCategorias_ContratacionManifestacion_Model.name        
    })
    @Type(()=> NomenclaCategorias_ContratacionManifestacion_Model)
    categoria_manifestacion: NomenclaCategorias_ContratacionManifestacion_Model

    @Prop({default:false, select: false||true})
    isDeleted:boolean

    @Prop({ default: Date.now })
    createdAt: Date;
  
    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const NomenclaCategorias_ContManifestacion_Especialidad_Schema=
SchemaFactory.createForClass(NomenclaCategorias_ContManifestacion_Especialidad_Model)

export type Nomencla_Categorias_ContratacionManifestacion_Especialidad_Document = HydratedDocument<
NomenclaCategorias_ContManifestacion_Especialidad_Model >