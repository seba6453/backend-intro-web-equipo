import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from 'src/schema/team.schema';
import { Model } from 'mongoose';
import { randomCaracter } from 'src/config/randomCaracter';
import { User } from 'src/schema/user.schema';
import { decodeToken } from 'src/config/token';
import { fetchUserOtherBackend } from 'src/microserviceLogin/getUser';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class TeamService {

  constructor(
    private jwtService: JwtService,
    @InjectModel(Team.name) private readonly teamModel: Model<Team>
  ){}

  async create(createTeamDto: CreateTeamDto, token: string) {

    const user: User = await decodeToken(token,this.jwtService);

    var uniqueCode = ""
    do {
      uniqueCode = randomCaracter(6);
    } while (await this.teamModel.findOne({ uniqueCode }));

    const teamNew: Team = await this.teamModel.create({
      name: createTeamDto.name,
      uniqueCode: uniqueCode,
      autor: user.userName
    });

    await this.addUser(user.email,teamNew.uniqueCode,token);

    return teamNew;
  }

  async findAll(token: string) {
    const decodedToken = this.jwtService.decode(token);
    if (!decodedToken || typeof decodedToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }

    const {username, email} = decodedToken

    return await this.teamModel.find({ 'listUser.email': email });
  }

  async findOne(uniqueCode: string, token: string) {
    const user: User = await decodeToken(token, this.jwtService);
    if (!user || typeof user !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }
    
    return await this.teamModel.findOne({ uniqueCode: uniqueCode });
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  async remove(uniqueCode: string, token: string) {
    const user: User = await decodeToken(token,this.jwtService);
    
    const team = await this.teamModel.findOne({ uniqueCode });
  
    if (!team) {
      throw new HttpException('No se encontró el equipo', HttpStatus.NOT_FOUND);
    }
  
    if (team.autor !== user.userName) {
      throw new HttpException('No tiene permiso para eliminar este equipo', HttpStatus.UNAUTHORIZED);
    }
  
    const result = await this.teamModel.deleteOne({ uniqueCode });
  
    if (result.deletedCount > 0) {
      return result;
    } else {
      throw new HttpException('Error al eliminar el equipo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addUser(email: string, uniqueCode: string, token: string) {
    var userNew: CreateUserDto;
    try{
      userNew = await fetchUserOtherBackend(token,email);
    }catch(error){
      throw new HttpException('Usuario no existe en el sistema', HttpStatus.NOT_ACCEPTABLE);
    }
    delete userNew._id;
  
    // Verificar si el usuario ya existe en el equipo
    const team = await this.teamModel.findOne({ uniqueCode, 'listUser.email': userNew.email });

    if (team) {
      // El usuario ya está en el equipo, por lo tanto, no se puede agregar nuevamente
      throw new HttpException('Usuario ya existe en este equipo', HttpStatus.NOT_ACCEPTABLE);
    }

    const result = await this.teamModel.updateOne(
      { uniqueCode },
      { $push: { listUser: userNew } }
    );

    if (result.modifiedCount > 0) {
      // El usuario se agregó exitosamente a la lista
      throw new HttpException('Usuario agregado exitosamente', HttpStatus.ACCEPTED);
    } else {
      // No se encontró el equipo con el código único proporcionado
      throw new HttpException('No se encontró el equipo con el código único proporcionado', HttpStatus.NOT_FOUND);
    }
  }

  async removeUser(email: string, uniqueCode: string) {
    try {
      // Buscar el equipo por el uniqueCode
      const team = await this.teamModel.findOne({ uniqueCode });
  
      if (!team) {
        throw new HttpException('No se encontró el equipo con el código único proporcionado', HttpStatus.NOT_FOUND);
      }
  
      // Verificar si el usuario con el correo electrónico proporcionado existe en la lista de participantes
      const userIndex = team.listUser.findIndex((user) => user.email === email);
      
      if (userIndex === -1) {
        throw new HttpException('El participante con el correo electrónico proporcionado no se encuentra en el equipo', HttpStatus.NOT_FOUND);
      }
  
      // Utilizar $pull para eliminar el usuario del arreglo listUser
      team.listUser.splice(userIndex, 1);
  
      // Guardar el equipo actualizado en la base de datos
      const updatedTeam = await team.save();
  
      return updatedTeam;
    } catch (error) {
      throw new HttpException('Error al eliminar este participante', HttpStatus.BAD_REQUEST);
    }
  }
  
}
