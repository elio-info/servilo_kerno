import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Types } from "mongoose";

@Schema({
    timestamps:true,
    validateBeforeSave:true,
    collection:'programasocial_priorizado'
})
export class ProgramaSocial_Priorizado {
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
    name :string    

    @Prop({ default: Date.now })
    createdAt: Date;
  
    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const ProgramaSocial_Schema=
SchemaFactory.createForClass(ProgramaSocial_Priorizado)

export type ProgramaSocial_Document =
ProgramaSocial_Priorizado & Document