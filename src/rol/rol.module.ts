import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rol, RolSchema } from 'src/schema/rol.schema';

@Module({
  providers: [RolService],
  controllers: [RolController],
  imports: [MongooseModule.forFeature([{ name: Rol.name, schema: RolSchema }])]
})
export class RolModule {}
