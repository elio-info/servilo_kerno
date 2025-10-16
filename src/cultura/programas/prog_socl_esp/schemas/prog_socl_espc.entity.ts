import { Prop } from "@nestjs/mongoose"
import { ProgramaSocial_Entity } from "../../prog_socl/schemas/prog_socl.entity"

export class ProgramaSocial_Especialidad_Entity
  {
    id:string
    nombre_programasocial_especial :string
    ID_categoria_manifestacion: ProgramaSocial_Entity
    @Prop({ default:false})
    isDeleted:boolean    
    createdAt:Date
    updatedAt:Date
}