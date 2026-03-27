import { Prop } from "@nestjs/mongoose";

export class ProgramaSocial_Entity {
    id:string;
    name :string;
    priorizado:boolean;
    programa:string;
    isDeleted:boolean;
    createdAt: Date;  
    updatedAt: Date;
}