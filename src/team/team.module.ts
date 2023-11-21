import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/constants';
import { Team,TeamSchema } from 'src/schema/team.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberModule } from 'src/member/member.module';
import { RolModule } from 'src/rol/rol.module';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports: [MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }])
    ,JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1 days'},
  }),MemberModule, RolModule]
})
export class TeamModule {}
