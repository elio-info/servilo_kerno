import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Types } from "mongoose";
import { IsOptional } from "class-validator";
import { ProgramaSocial } from "../../prog_socl/schemas/prog_socl.schema";
import { Type } from "class-transformer";

@Schema({
    timestamps:true,
    validateBeforeSave:true,
    collection:'ProgramaSocial_Especial'
})
export class ProgramaSocial_Especial {
    _id: Types.ObjectId;

    @ApiProperty({
        type:String,
        description:'Nombre del Nomenclador del tipo de especialidad dentro del Programa Social'
    })
    @Prop({
        required:true,
        unique: true
    })
    nombre_programasocial_especial :string

    @Prop({
        type: Types.ObjectId, ref: ProgramaSocial.name        
    })
    @Type(()=> ProgramaSocial)
    programa: ProgramaSocial

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

export const ProgramaSocial_Especial_Schema=
SchemaFactory.createForClass(ProgramaSocial_Especial)

export type ProgramaSocial_Especial_Document =
ProgramaSocial_Especial & Document