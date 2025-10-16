import { Prop } from "@nestjs/mongoose";

export class Province {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  @Prop({default:false})
  isDeleted:boolean
}
