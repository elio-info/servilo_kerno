import { Prop } from "@nestjs/mongoose";

export class Province {
  id: string;
  name: string; 
  isDeleted:boolean; // @Prop({default:false})
  createdAt: Date;
  updatedAt: Date;
}
