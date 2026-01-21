import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

export type ProvinceDocument = HydratedDocument<ProvinceModel>;

@Schema({ timestamps: true,validateBeforeSave:true, collection: 'provinces' })
export class ProvinceModel {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({type:'boolean', default: false, select: false||true })
  isDeleted: boolean; 
  
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProvinceSchema = SchemaFactory.createForClass(ProvinceModel);
//ProvinceSchema.plugin(TrazasService)
