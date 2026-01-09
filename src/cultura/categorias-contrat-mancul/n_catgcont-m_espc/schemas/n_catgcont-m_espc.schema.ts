import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, HydratedDocument, Types } from "mongoose";
import { Nomencla_Categorias_ContratacionManifestacion } from "../../n_catgcont-m/schemas/n_catgcont-m.schema";
import { IsOptional } from "class-validator";
import { Type } from "class-transformer";

@Schema({
    timestamps:true,
    validateBeforeSave:true,
    collection:'Nomencla_Categorias_ContratacionManifestacion_Especialidad'
})
export class Nomencla_Categorias_ContratacionManifestacion_Especialidad {
    @ApiProperty({
        type:String,
        description:'Nombre del Nomenclador del tipo de especialidad dentro de la Manifestacion'
    })
    @Prop({
        required:true,
        unique: true
    })
    nombre_categoria_manifestacion_especialidad :string

    @Prop({
        type: Types.ObjectId,
        ref: Nomencla_Categorias_ContratacionManifestacion.name        
    })
    @Type(()=> Nomencla_Categorias_ContratacionManifestacion)
    ID_categoria_manifestacion: Nomencla_Categorias_ContratacionManifestacion

    @IsOptional()
    @ApiProperty({
        type: Boolean,
        default:false
    })
    @Prop()
    isDeleted:boolean

    @Prop({ default: Date.now })
    createdAt: Date;
  
    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const Nomencla_Categorias_ContratacionManifestacion_Especialidad_Schema=
SchemaFactory.createForClass(Nomencla_Categorias_ContratacionManifestacion_Especialidad)

export type Nomencla_Categorias_ContratacionManifestacion_Especialidad_Document = HydratedDocument<
Nomencla_Categorias_ContratacionManifestacion_Especialidad >