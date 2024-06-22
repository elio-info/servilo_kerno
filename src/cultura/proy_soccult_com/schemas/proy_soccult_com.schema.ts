import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Telefonos_Type_Dto } from "src/cultura/codificadores-cult/infrastructure/telefonos.dto";

@Schema({
    timestamps:true,
    validateBeforeSave:true,
    collection:'Proyecto_Sociocultural_Comunitario'
})
export class Proyecto_Sociocultural_Comunitario_Model{
    _id:Types.ObjectId

    @Prop({required:true})
    nombre:string

    municipality:string

    province:string
    
    @Prop({required:true})
    responsable:string

    telefonos:Telefonos_Type_Dto

    @Prop({ default: Date.now })
    createdAt: Date;
  
    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const Proyecto_Sociocultural_Comunitario_Schema= SchemaFactory.createForClass(Proyecto_Sociocultural_Comunitario_Model)

export type Proyecto_Sociocultural_Comunitario_Document= Proyecto_Sociocultural_Comunitario_Model & Document