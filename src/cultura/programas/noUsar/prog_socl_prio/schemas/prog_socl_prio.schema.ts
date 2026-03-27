import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({
    timestamps:true,
    validateBeforeSave:true,
    collection:'programasocial_priorizado'
})
export class ProgramaSocial_Priorizado_Model {
    @Prop()
    _id: Types.ObjectId;

    @Prop({
        required:true,
        unique: true
    })
    name :string    

    @Prop({
        type: Boolean,
        default:false,
        select: true||false
    })
    isDeleted:boolean

    @Prop({ default: Date.now })
    createdAt: Date;
  
    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const ProgramaSocial_Priorizado_Schema=
SchemaFactory.createForClass(ProgramaSocial_Priorizado_Model)

export type ProgramaSocial_Priorizado_Document =
ProgramaSocial_Priorizado_Model & Document