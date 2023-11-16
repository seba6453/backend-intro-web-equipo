import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamModule } from './team/team.module';
import { MongooseModule } from '@nestjs/mongoose';
import { linkMongo } from './config/constants';
import { RolModule } from './rol/rol.module';
import { MemberModule } from './member/member.module';


@Module({
  imports: [TeamModule,
    MongooseModule.forRoot(linkMongo.secret),
    RolModule,
    MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
