import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type Traza = TrazaClass & Document;

@Schema({ 
    timestamps: true,
    collection:'trazas'
 })

export class TrazaClass  {
  @Prop({required:true}) user : string;
  @Prop({required:true}) collections : string;
  @Prop({required:true, enum:['save', 'findOneAndUpdate']}) operation: string;
  @Prop({ type: Object }) error: Record<string, any> | null;
  @Prop({ type: Object }) filter: Record<string, any>| null;
  @Prop({ type: Object }) before: Record<string, any> | null;
  @Prop({ type: Object }) update: Record<string, any> | null;
  @Prop({default: Date.now}) timestamp:Date;
}

export const TrazaSchema = SchemaFactory.createForClass(TrazaClass);
