import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument, Types } from "mongoose";

@Schema({
    timestamps:true,
    validateBeforeSave:true,
    collection:'nomenclacategorias_contmanifestacion'
})
export class NomenclaCategorias_ContratacionManifestacion_Model {
    _id: Types.ObjectId;
    
    @ApiProperty({
        type:String,
        description:'Nombre del Nomenclador. Ej: música, danza, audio, transporte, luces, etc.'
    })
    @Prop({
        required:true,
        unique: true
    })
    name :string

    @ApiProperty({
        type:Boolean,
        description:'Si: luces, transporte.	No: danza, teatro'
    })
    @Prop({
        default:false, select: false||true
    })
    apoyo_categoria_manifestacion:boolean

    @Prop({
        default:false, select: false||true
    })
    isDeleted:boolean
    
    @Prop()
    createdAt: Date;
  
    @Prop()
    updatedAt: Date;
}

export const NomenclaCategorias_ContratacionManifestacion_Schema=
SchemaFactory.createForClass(NomenclaCategorias_ContratacionManifestacion_Model)

export type NomenclaCategorias_ContratacionManifestacion_Document = HydratedDocument<NomenclaCategorias_ContratacionManifestacion_Model>