import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TrazasService } from 'src/cultura/trazas/trazas.service';

export type ProvinceDocument = HydratedDocument<ProvinceModel>;


@Schema({ timestamps: true, collection: 'provinces' })
export class ProvinceModel {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({ default: false, select: false })
  isDeleted: boolean;
  
  @Prop({ default: false, select: false })
  is_Deleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProvinceSchema = SchemaFactory.createForClass(ProvinceModel);
//ProvinceSchema.plugin(TrazasService)
