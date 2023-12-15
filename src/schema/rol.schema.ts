import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RolDocument = HydratedDocument<Rol>;

@Schema()
export class Rol {
  @Prop({ required: true, trim: true, unique: true })
  name: string;

}


export const RolSchema = SchemaFactory.createForClass(Rol);

RolSchema.index({ name: 1, id_team: 1 }, { unique: true });