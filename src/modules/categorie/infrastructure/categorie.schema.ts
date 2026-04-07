import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { API_Struct } from '../domain/entities/categorie.entity';

export type CategorieDocument = HydratedDocument<CategorieModel>;

@Schema({ timestamps: true, collection: 'categorie' })
export class CategorieModel {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  nameTitle: string;

  @Prop({ required: true, type: String })
  link: string;

  @Prop({required:true,type:[API_Struct]})
  access_point:API_Struct[]

  @Prop({ default: false, select: false || true})
  isDeleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CategorieSchema = SchemaFactory.createForClass(CategorieModel);
