import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({
    timestamps:true,
    validateBeforeSave:true,
    collection:'programasocial_especial'
})
export class ProgramaSocial_Especial_Model {
    _id: Types.ObjectId;
    
    @Prop({
        required:true,
        unique: true
    })
    name :string
    
    

    @Prop({type:Boolean,default:false, select :true||false})
    isDeleted:boolean

    @Prop({ default: Date.now })
    createdAt: Date;
  
    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const ProgramaSocial_Especial_Schema=
SchemaFactory.createForClass(ProgramaSocial_Especial_Model)

export type ProgramaSocial_Especial_Document =
ProgramaSocial_Especial_Model & Document