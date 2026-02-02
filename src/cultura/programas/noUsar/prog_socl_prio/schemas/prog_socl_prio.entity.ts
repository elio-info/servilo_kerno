import { Prop } from "@nestjs/mongoose";

export class ProgramaSocial_Priorizado_Entity {
    id:string
    name :string
    isDeleted:boolean;
    createdAt: Date;  
    updatedAt: Date;
}