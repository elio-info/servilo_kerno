import { Prop } from "@nestjs/mongoose";

export class ProvinceEntity {
  id: string;
  name: string; 
  isDeleted:boolean; // @Prop({default:false})
  createdAt: Date;
  updatedAt: Date;
}
