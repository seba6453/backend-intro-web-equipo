import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MemberDocument = HydratedDocument<Member>;

@Schema()
export class Member {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, ref: 'Team' })
  id_team: string;

  @Prop({ default: null, ref: 'Rol' })
  rol: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);

MemberSchema.index({ rol: 1, id_team: 1, userName: 1, email: 1}, { unique: true });