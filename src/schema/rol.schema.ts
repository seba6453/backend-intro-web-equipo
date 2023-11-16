import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RolDocument = HydratedDocument<Rol>;

@Schema()
export class Rol {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, ref: 'Team' })
  id_team: string;
}


export const RolSchema = SchemaFactory.createForClass(Rol);

RolSchema.index({ name: 1, id_team: 1 }, { unique: true });