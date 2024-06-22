import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { Types } from "mongoose";
import { Telefonos_Type_Dto } from "src/cultura/codificadores-cult/infrastructure/telefonos.dto";
import { MunicipalityModel } from "src/modules/municipality/infrastructure/municipality.schema";
import { ProvinceModel } from "src/modules/province/infrastructure/province.schema";

@Schema({
    timestamps:true,
    validateBeforeSave:true,
    collection:'Proyecto_Sociocultural_Comunitario'
})
export class Proyecto_Sociocultural_Comunitario_Model{
    _id:Types.ObjectId

    @Prop({required:true,
        unique:true
    })
    nombre:string

    @Prop({ type: Types.ObjectId, ref: MunicipalityModel.name })
    @Type(() => MunicipalityModel)
    municipality: MunicipalityModel;

    @Prop({ type: Types.ObjectId, ref: ProvinceModel.name })
    @Type(() => ProvinceModel)
    province:string
    
    @Prop({required:true})
    responsable:string

    @Prop()
    telefonos:Telefonos_Type_Dto

    @Prop({ default: Date.now })
    createdAt: Date;
  
    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const Proyecto_Sociocultural_Comunitario_Schema= SchemaFactory.createForClass(Proyecto_Sociocultural_Comunitario_Model)

export type Proyecto_Sociocultural_Comunitario_Document= Proyecto_Sociocultural_Comunitario_Model & Document