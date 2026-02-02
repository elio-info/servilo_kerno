import { Prop } from "@nestjs/mongoose"
import { ProgramaSocial_Priorizado_Entity } from "../../prog_socl_prio/schemas/prog_socl_prio.entity"

export class ProgramaSocial_Especial_Entity
  {
    id:string
    name :string
    isDeleted:boolean    
    createdAt:Date
    updatedAt:Date
}