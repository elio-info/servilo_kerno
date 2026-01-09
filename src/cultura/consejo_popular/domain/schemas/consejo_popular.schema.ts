import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ProvinceModel } from 'src/modules/province/infrastructure/province.schema';
import { Type } from 'class-transformer';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';

export type ConsejoPopular_Municipality_Document = HydratedDocument<ConsejoPopular_Municipality_Model>;

@Schema({ timestamps: true, collection: 'consejopopular_municipal' })
export class ConsejoPopular_Municipality_Model {
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
  municipality:string // ProvinceModel;

  @Prop({ type: Types.ObjectId, ref: ProvinceModel.name })
 @Type(() => ProvinceModel)
  province:string // ProvinceModel;
}

export const ConsejoPopular_Municipality_Schema =
  SchemaFactory.createForClass(ConsejoPopular_Municipality_Model);
