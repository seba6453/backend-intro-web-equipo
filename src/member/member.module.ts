import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberSchema, Member } from 'src/schema/member.schema';
import { RolModule } from 'src/rol/rol.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/constants';

@Module({
  providers: [MemberService],
  imports: [MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1 days'}}), RolModule],
  exports: [MemberService]
})
export class MemberModule {}
