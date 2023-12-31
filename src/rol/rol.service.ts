import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Rol } from 'src/rol/entity/rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolService {
    constructor(
        @InjectModel(Rol.name) private readonly rolModel: Model<Rol>,
        private readonly jwtService: JwtService
    ){}

    async getAll(token: string): Promise<Rol[]> {
        const decodedToken = this.jwtService.decode(token);
        if (!decodedToken || typeof decodedToken !== 'object') {
            throw new Error('Token inválido o no contiene información del usuario.');
        }
        return await this.rolModel.find().exec();
    }

    async findOneName(name: string, token: string): Promise<Rol>{
        const decodedToken = this.jwtService.decode(token);
        if (!decodedToken || typeof decodedToken !== 'object') {
            throw new Error('Token inválido o no contiene información del usuario.');
        }
        const rol: Rol = await this.rolModel.findOne({name: name}).exec();
        return rol;
    }

    async findOneId(id: string, token: string): Promise<Rol>{
        const decodedToken = this.jwtService.decode(token);
        if (!decodedToken || typeof decodedToken !== 'object') {
            throw new Error('Token inválido o no contiene información del usuario.');
        }
        const rol: Rol = await this.rolModel.findOne({_id: id}).exec();
        return rol;
    }

    async create(rol: CreateRolDto, token: string): Promise<Rol> {
        const decodedToken = this.jwtService.decode(token);
        if (!decodedToken || typeof decodedToken !== 'object') {
            throw new Error('Token inválido o no contiene información del usuario.');
        }

        const newRol: Rol = await this.rolModel.create(rol);

        return newRol;
    }

    async delete(id_rol: string, token: string) {
        const decodedToken = this.jwtService.decode(token);
        if (!decodedToken || typeof decodedToken !== 'object') {
            throw new Error('Token inválido o no contiene información del usuario.');
        }
        return this.rolModel.deleteOne({_id: id_rol});
    }

    async deleteByTeam(id_team: string){
        return this.rolModel.deleteMany({id_team: id_team});
    }
}
