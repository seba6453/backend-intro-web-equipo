import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rol, RolSchema } from 'src/schema/rol.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/constants';

@Module({
  providers: [RolService],
  controllers: [RolController],
  imports: [MongooseModule.forFeature([{ name: Rol.name, schema: RolSchema }]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1 days'}})],
  exports: [RolService]
})
export class RolModule {}
