import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User, UserSchema } from './user.schema';

export type UserDocument = HydratedDocument<Team>;

@Schema()
export class Team {
  @Prop({ auto: true })
  teamID: number;
  
  @Prop({ unique: false, trim: true, required: true })
  name: string;

  @Prop({ unique: false, trim: true, required: true })
  autor: string;

  @Prop({ type: [UserSchema], default: [], required: false, sparse: true, unique: true })
  listUser: User[];

  @Prop({ unique: true, trim: true, required: true })
  uniqueCode: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);