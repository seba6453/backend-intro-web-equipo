import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/constants';
import { Team,TeamSchema } from 'src/schema/team.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports: [MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }, {name: User.name , schema: UserSchema}])
    ,JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1 days'},
  })]
})
export class TeamModule {}
