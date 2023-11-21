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

  @Prop({ required: true, ref: 'Rol' })
  id_rol: string;
}

export const MemberSchema = SchemaFactory.createForClass(Member);