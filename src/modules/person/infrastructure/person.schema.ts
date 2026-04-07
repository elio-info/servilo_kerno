import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Type } from 'class-transformer';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';
import { EntityModel } from 'src/modules/entity/infrastructure/entity.schema';
import { Charge_Entity } from 'src/modules/charge/domain/entities/charge.entity';

export type PersonDocument = HydratedDocument<PersonModel>;

@Schema({ timestamps: true, collection: 'persons' })
export class PersonModel {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  lastName1: string;

  @Prop()
  lastName2: string;

  @Prop({ unique: true })
  ci: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    enum: {
      values: ['Blanco', 'Negro', 'Mestizo', 'Amarillo'],
      message: '{VALUE} is not supported',
    },
  })
  skinColor: string;

  @Prop()
  phone: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  passwordMustChange: boolean;

  @Prop()
  passwordExpirationDate: Date;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true, select: false })
  hashPassword: string;

  @Prop()
  address: string;

  @Prop()
  image: string;

  @Prop()
  gender: string;

  @Prop({ type: Types.ObjectId, ref: EntityModel.name })
  @Type(() => EntityModel)
  entity: EntityModel;

  @Prop()
  role: string;

  @Prop({ default: false, select: false || true })
  isDeleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: Types.ObjectId, ref: MunicipalityModel.name })
  @Type(() => MunicipalityModel)
  municipality: MunicipalityModel;

  @Prop({ required: true,type: Charge_Entity })
  charge: Charge_Entity;
  
}

export const PersonSchema = SchemaFactory.createForClass(PersonModel);
