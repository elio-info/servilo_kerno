import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type EntityTypeDocument = HydratedDocument<EntityTypeModel>;

@Schema({ timestamps: true, collection: 'entity_type' })
export class EntityTypeModel {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({ required: true, type: Number, default: 0 })
  hierarchy: number;

  @Prop({ default: false, select: false })
  isDeleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const EntityTypeSchema = SchemaFactory.createForClass(EntityTypeModel);
