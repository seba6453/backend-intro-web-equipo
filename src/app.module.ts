import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamModule } from './team/team.module';
import { MongooseModule } from '@nestjs/mongoose';
import { linkMongo } from './config/constants';


@Module({
  imports: [TeamModule,
    MongooseModule.forRoot(linkMongo.secret)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
