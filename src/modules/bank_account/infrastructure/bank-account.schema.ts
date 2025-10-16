import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Type } from 'class-transformer';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';
import { EntityModel } from 'src/modules/entity/infrastructure/entity.schema';

export type BankAccountDocument = HydratedDocument<BankAccountModel>;

@Schema({ timestamps: true, collection: 'bank_account' })
export class BankAccountModel {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: EntityModel.name, required: true })
  @Type(() => EntityModel)
  entity: EntityModel;
  @Prop({ default: false })
  isCard: boolean;
  @Prop({ required: true, enum: ['CUP', 'MLC', 'CL'] })
  accountType: string;

  @Prop({ required: true })
  account: string;

  @Prop({ required: true })
  titular: string;

  @Prop({ required: true })
  bank: string;

  @Prop({ required: true })
  agency: string;

  @Prop({ required: true })
  subsidiary: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: Types.ObjectId, ref: MunicipalityModel.name, required: true })
  @Type(() => MunicipalityModel)
  municipality: MunicipalityModel;

  @Prop({ default: false, select: false })
  isDeleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BankAccountSchema = SchemaFactory.createForClass(BankAccountModel);
