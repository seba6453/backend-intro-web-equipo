import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Rol } from 'src/schema/rol.schema';
import { CreateRolDto } from './dto/create-rol.dto';

@Injectable()
export class RolService {
    constructor(
        @InjectModel(Rol.name) private readonly rolModel: Model<Rol>
    ){}

    async getAll() {
        return await this.rolModel.find().exec();
    }

    async findOneId(id: string){
        return await this.rolModel.findById(id);
    }

    async create(rol: CreateRolDto){
        return await this.rolModel.create(rol);
    }
}
