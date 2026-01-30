import { Prop } from "@nestjs/mongoose";

export class ProgramaSocial_Entity {
    id:string
    nombre_programasocial :string
    @Prop({  default:true })
    // priorizado:boolean
    createdAt: Date;  
    updatedAt: Date;
}