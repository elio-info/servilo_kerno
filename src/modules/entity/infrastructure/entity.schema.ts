import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Type } from 'class-transformer';
import { MunicipalityModel } from 'src/modules/municipality/infrastructure/municipality.schema';
import { EntityTypeModel } from 'src/modules/entity_type/infrastructure/entity-type.schema';
import { PlaceModel } from 'src/modules/place/infrastructure/place.schema';
import { Clasifica_Nivel_EntidadCultural } from 'src/cultura/codificadores-cult/enums/codificadores';
import { ConsejoPopular_Municipality_Model } from 'src/cultura/consejo_popular/domain/schemas/consejo_popular.schema';

export type EntityDocument = HydratedDocument<EntityModel>;

@Schema({ timestamps: true, collection: 'entity' , validateBeforeSave:true})
export class EntityModel {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: EntityTypeModel.name, required: true })
  @Type(() => EntityTypeModel)
  entityType: string;

  @Prop({ type: Types.ObjectId, ref: EntityModel.name, required:false })
  @Type(() => EntityModel)
  parentId?: string;//EntityModel

  @Prop({ required: true, unique:true })
  name: string;

  @Prop({ type: String,
    enum: Object.keys(Clasifica_Nivel_EntidadCultural), 
    default: Clasifica_Nivel_EntidadCultural.Mnpl})
  nivel: string;
  
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

  @Prop({ type: Types.ObjectId, ref: ConsejoPopular_Municipality_Model.name })
  @Type(() => ConsejoPopular_Municipality_Model)
  consejo_p: ConsejoPopular_Municipality_Model;

  @Prop({ default: '' })
  reeup: string;

  @Prop({ default: '' })
  commercialRegister: string;

  @Prop({ default: false, select: false||true })
  isDeleted: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const EntitySchema = SchemaFactory.createForClass(EntityModel);
