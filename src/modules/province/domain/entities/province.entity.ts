import { Prop } from "@nestjs/mongoose";

export class Province {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  @Prop({default:false})
  isDeleted:boolean
}
export class miniProvince {
  id: string;
  name: string;
  @Prop({default:false})
  isDeleted:boolean
}