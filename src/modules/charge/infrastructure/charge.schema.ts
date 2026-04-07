import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Categorie_Entity } from 'src/modules/categorie/domain/entities/categorie.entity';
import { EntityModel } from 'src/modules/entity/infrastructure/entity.schema';

export type ChargeDocument = HydratedDocument<ChargeModel>;

@Schema({ timestamps: true, collection: 'charge' })
export class ChargeModel {
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({ required: true, type: Types.ObjectId,ref:EntityModel.name })
  entity: string;

  @Prop({ required: true, type: [ Categorie_Entity ] })
  access: Categorie_Entity[];

  @Prop({ required: true, type: [{type: Types.ObjectId, ref: EntityModel.name}] })
  subord: string[];


  @Prop({ default: false, select: false || true })
  isDeleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ChargeSchema = SchemaFactory.createForClass(ChargeModel);
