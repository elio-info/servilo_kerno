import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Types } from "mongoose";

@Schema({
    timestamps:true,
    validateBeforeSave:true,
    collection:'ProgramaSocial'
})
export class ProgramaSocial {
    @Prop()
    _id: Types.ObjectId;

    @ApiProperty({
        type:String,
        description:'Nombre del Nomenclador. '
    })
    @Prop({
        required:true,
        unique: true
    })
    nombre_programasocial :string

    // @ApiProperty({
    //     type:Boolean,
    //     description:'Si: priorizado.	No: provincial',default:true
    // })
    // @Prop({
    //     default:true
    // })
    // priorizado:boolean

    @Prop({ default: Date.now })
    createdAt: Date;
  
    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const ProgramaSocial_Schema=
SchemaFactory.createForClass(ProgramaSocial)

export type ProgramaSocial_Document =
ProgramaSocial & Document