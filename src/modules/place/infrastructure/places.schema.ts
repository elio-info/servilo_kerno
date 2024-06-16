import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Type } from 'class-transformer';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';

export type PlaceDocument = HydratedDocument<PlaceModel>;

@Schema({ timestamps: true, collection: 'places' })
export class PlaceModel {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ default: false, select: false })
  isDeleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: Types.ObjectId, ref: MunicipalityModel.name })
  @Type(() => MunicipalityModel)
  municipality: MunicipalityModel;
}

export const PlaceSchema = SchemaFactory.createForClass(PlaceModel);
