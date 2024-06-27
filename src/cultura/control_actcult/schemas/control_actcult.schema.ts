import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Talento_Artistico_Contratado_Entity } from "../../talentos/talento_contratado/talento_contratado.entity";

@Schema({ timestamps:true, collection:'Control_ActividadCultural'})
export  class Control_ActividadCultural_Model{
    _id:Types.ObjectId

    @Prop()
    nombre_actcult:string

    @Prop()
    dia_actcult:string

    @Prop()
    hora_actcult:string  //Timestamp

    @Prop([Talento_Artistico_Contratado_Entity])
    talentos_y_apoyos?:Talento_Artistico_Contratado_Entity[]
}

export const Control_ActividadCultural_Schema=SchemaFactory.createForClass(Control_ActividadCultural_Model)

export type Control_ActividadCultural_Document= Control_ActividadCultural_Model & Document

