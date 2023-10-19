import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from 'src/schema/team.schema';
import { Model } from 'mongoose';
import { randomCaracter } from 'src/config/randomCaracter';
import { User } from 'src/schema/user.schema';


@Injectable()
export class TeamService {

  constructor(
    private jwtService: JwtService,
    @InjectModel(Team.name) private readonly teamModel: Model<Team>
  ){}

  async create(createTeamDto: CreateTeamDto, token: string) {
    const decode: any = this.jwtService.decode(token);

    const user: User = {
      userName: decode.username,
      email: decode.email
    }

    var uniqueCode = ""
    do {
      uniqueCode = randomCaracter(6);
    } while (await this.teamModel.findOne({ uniqueCode }));

    const teamNew: Team = await this.teamModel.create({
      name: createTeamDto.name,
      uniqueCode: uniqueCode,
      autor: user.userName
    });

    await this.addUser(user, teamNew.uniqueCode);

    return teamNew;
  }

  async findAll() {
    return await this.teamModel.find().exec();
  }

  async findOne(uniqueCode: string) {
    return await this.teamModel.findOne({ uniqueCode });
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  async remove(uniqueCode: string) {
    return await this.teamModel.deleteOne({ uniqueCode });
  }

  async addUser(user: User, uniqueCode: string) {
    try {
      const result = await this.teamModel.updateOne(
        { uniqueCode },
        { $push: { listUser: user } }
      );
  
      if (result.modifiedCount > 0) {
        // El usuario se agregó exitosamente a la lista
        return 'Usuario agregado exitosamente';
      } else {
        // No se encontró el equipo con el código único proporcionado
        return 'No se encontró el equipo con el código único proporcionado';
      }
    } catch (error) {
      // Manejar errores, por ejemplo, si hay un problema de base de datos
      return 'Error al agregar usuario';
    }
  }
}
