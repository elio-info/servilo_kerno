import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Type } from 'class-transformer';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';
import { EntityTypeModel } from 'src/modules/entity_type/infrastructure/entity-type.schema';
import { PlaceModel } from 'src/modules/place/infrastructure/places.schema';

export type EntityDocument = HydratedDocument<EntityModel>;

@Schema({ timestamps: true, collection: 'entity' })
export class EntityModel {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: EntityTypeModel.name, required: true })
  @Type(() => EntityTypeModel)
  entityType: EntityTypeModel;

  @Prop({ type: Types.ObjectId, ref: EntityModel.name })
  @Type(() => EntityModel)
  parentId: EntityModel;

  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  nitCode: string;

  @Prop({ default: '' })
  abbreviation: string;

  @Prop({ default: '' })
  resolution: string;

  @Prop({ type: Date })
  resolutionDate: Date;

  @Prop({ default: '' })
  issuedBy: string;

  @Prop({ default: '' })
  domicilie: string;

  @Prop({ type: Types.ObjectId, ref: MunicipalityModel.name })
  @Type(() => MunicipalityModel)
  municipality: MunicipalityModel;

  @Prop({ type: Types.ObjectId, ref: PlaceModel.name })
  @Type(() => PlaceModel)
  place: PlaceModel;

  @Prop({ default: '' })
  reeup: string;

  @Prop({ default: '' })
  commercialRegister: string;

  @Prop({ default: false, select: false })
  isDeleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const EntitySchema = SchemaFactory.createForClass(EntityModel);
