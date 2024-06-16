import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CategorieDocument = HydratedDocument<CategorieModel>;

@Schema({ timestamps: true, collection: 'categorie' })
export class CategorieModel {
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

export const CategorieSchema = SchemaFactory.createForClass(CategorieModel);
