import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Types } from "mongoose";

@Schema({
    timestamps:true,
    validateBeforeSave:true,
    collection:'Nomencla_Categorias_ContratacionManifestacion'
})
export class Nomencla_Categorias_ContratacionManifestacion {
    _id: Types.ObjectId;
    
    @ApiProperty({
        type:String,
        description:'Nombre del Nomenclador. Ej: música, danza, audio, transporte, luces, etc.'
    })
    @Prop({
        required:true,
        unique: true
    })
    nombre_categoria_manifestacion :string

    @ApiProperty({
        type:Boolean,
        description:'Si: luces, transporte.	No: danza, teatro',default:false
    })
    @Prop({
        default:false
    })
    apoyo_categoria_manifestacion:boolean

    @Prop({ default: Date.now })
    createdAt: Date;
  
    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const Nomencla_Categorias_ContratacionManifestacion_Schema=
SchemaFactory.createForClass(Nomencla_Categorias_ContratacionManifestacion)

export type Nomencla_Categorias_ContratacionManifestacion_Document =
Nomencla_Categorias_ContratacionManifestacion & Document