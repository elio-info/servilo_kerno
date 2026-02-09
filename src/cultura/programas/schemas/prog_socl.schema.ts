import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({
    timestamps:true,
    validateBeforeSave:true,
    collection:'programasocial'
})
export class ProgramaSocial_Model {
    @Prop()
    _id: Types.ObjectId;

    @Prop({
        required:true,
        unique: true
    })
    name :string    

    @Prop({
        type: Boolean,
        default:true,
        select: true||false
    })
    priorizado:boolean

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

export const ProgramaSocial_Schema=
SchemaFactory.createForClass(ProgramaSocial_Model)

export type ProgramaSocial_Document =
ProgramaSocial_Model & Document