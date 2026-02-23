import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Talento_Artistico_Contratado_Entity } from "../../talentos/talento_contratado/talento_contratado.entity";
import { EntityModel } from "src/modules/entity/infrastructure/entity.schema";
import { Type } from "class-transformer";
import { ProgramaSocial_Model } from "src/cultura/programas/schemas/prog_socl.schema";

@Schema({ timestamps:true, collection:'control_actividadcultural'})
export  class Control_ActividadCultural_Model{
    _id:Types.ObjectId

    @Prop()
    name:string

    @Prop()
    dia_actcult:string

    @Prop()
    hora_actcult:string  //Timestamp

    @Prop({type:Types.ObjectId,ref:EntityModel.name})
    @Type(()=>EntityModel)
    entidad_responsable:EntityModel

    @Prop([{ type:Types.ObjectId, ref: ProgramaSocial_Model.name}])
    // @Type(()=>ProgramaSocial_Model)
    programas:[ProgramaSocial_Model]

    @Prop([Talento_Artistico_Contratado_Entity])
    talentos_y_apoyos?:Talento_Artistico_Contratado_Entity[]

    @Prop({default: false, select: false || true })
    isDeleted: boolean;
  
    @Prop()
    createdAt: Date;
  
    @Prop()
    updatedAt: Date;
}

export const Control_ActividadCultural_Schema=SchemaFactory.createForClass(Control_ActividadCultural_Model)

export type Control_ActividadCultural_Document= Control_ActividadCultural_Model & Document

