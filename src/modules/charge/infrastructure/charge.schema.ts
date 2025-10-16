import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ChargeDocument = HydratedDocument<ChargeModel>;

@Schema({ timestamps: true, collection: 'charge' })
export class ChargeModel {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({ default: false, select: false })
  isDeleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ChargeSchema = SchemaFactory.createForClass(ChargeModel);
