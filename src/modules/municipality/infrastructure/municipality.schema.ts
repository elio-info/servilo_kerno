import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ProvinceModel } from '../../province/infrastructure/province.schema';
import { Type } from 'class-transformer';

export type MunicipalityDocument = HydratedDocument<MunicipalityModel>;

@Schema({ timestamps: true, collection: 'municipalities' })
export class MunicipalityModel {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ default: false, select: false })
  isDeleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: Types.ObjectId, ref: ProvinceModel.name })
  @Type(() => ProvinceModel)
  province: ProvinceModel;
}

export const MunicipalitySchema =
  SchemaFactory.createForClass(MunicipalityModel);
