import { HttpException, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { decodeToken } from 'src/config/token';
import { randomCaracter } from 'src/config/randomCaracter';
import { MemberService } from 'src/member/member.service';
import { Team } from './entities/team.entity';
import { RolService } from 'src/rol/rol.service';
import { Rol } from 'src/rol/entity/rol.entity';
import { HttpStatusCode } from 'axios';
import { DeleteMemberDto } from 'src/member/dto/delete-member.dto';
import { CreateMemberReques } from './dto/create-user-team.dto';
import { fetchTeamsOtherBackend } from 'src/fetchMicroService/getTeams';
import { TeamProyect } from './entities/teamProyect.entity';
import { AssingRolMemberDto } from 'src/member/dto/assing-rol-member.dto';

@Injectable()
export class TeamService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
    private readonly memberService: MemberService,
    private readonly rolService: RolService,
  ) {}

  async create(createTeamDto: CreateTeamDto, token: string) {
    const user: User = decodeToken(token, this.jwtService);
    if (!user || typeof user !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }

    var uniqueCode = '';
    do {
      uniqueCode = randomCaracter(6);
    } while (await this.teamModel.findOne({ uniqueCode }));

    const teamNew: Team = await this.teamModel.create({
      name: createTeamDto.name,
      uniqueCode: uniqueCode,
      autor: user.userName,
    });

    const rol: Rol = await this.rolService.create(
      { id_team: teamNew.id, name: 'Lider' },
      token,
    );

    try {
      await this.memberService.createMember({
        userName: user.userName,
        email: user.email,
        id_team: teamNew.id,
        rol: rol.name,
      });
      return teamNew;
    } catch {
      await this.teamModel.deleteOne({ _id: teamNew.id });
      await this.rolService.delete(rol.id, token);
      return new HttpException(
        'No se ha creado el equipo',
        HttpStatusCode.BadRequest,
      );
    }
  }

  async findAll(token: string): Promise<Team[]> {
    const user: User = decodeToken(token, this.jwtService);
    if (!user || typeof user !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }

    const listMember = await this.memberService.getMembersByUserName(
      user.userName,
    );

    const teamsId = listMember.map((member) => member.id_team);

    return await this.teamModel.find({ _id: { $in: teamsId } });
  }

  async findOne(uniqueCode: string, token: string) {
    const decodedToken = this.jwtService.decode(token);
    if (!decodedToken || typeof decodedToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }
    return this.teamModel.findOne({ uniqueCode: uniqueCode });
  }

  async update(id: string, updateTeamDto: UpdateTeamDto, token: string) {
    const decodedToken = this.jwtService.decode(token);
    if (!decodedToken || typeof decodedToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }
    const updateResult: UpdateResult = await this.teamModel.updateOne(
      { _id: id },
      updateTeamDto,
    );
    if (updateResult.modifiedCount === 1) {
      return { message: 'Equipo actualizado exitosamente', statusCode: 200 };
    } else {
      return { message: 'No se pudo actualizar el equipo', statusCode: 404 };
    }
  }

  async remove(uniqueCode: string, token: string) {
    const decodedToken = this.jwtService.decode(token);
    if (!decodedToken || typeof decodedToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }
    const team: Team = await this.teamModel.findOne({ uniqueCode: uniqueCode });

    const deleteResponse: DeleteResponse = await this.teamModel.deleteOne({
      uniqueCode: uniqueCode,
    });
    if (deleteResponse.deletedCount === 1) {
      await this.memberService.deleteByTeam(team.id);
      await this.rolService.deleteByTeam(team.id);
      return { message: 'Equipo eliminado exitosamente', statusCode: 200 };
    } else {
      return { message: 'No se pudo eliminar el equipo', statusCode: 404 };
    }
  }

  async getMemberByTeam(id_team: string, token: string) {
    const decodedToken = this.jwtService.decode(token);
    if (!decodedToken || typeof decodedToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }
    return this.memberService.getMemberByTeam(id_team);
  }

  async addMemberTeam(data: CreateMemberReques, token: string) {
    const decodedToken = this.jwtService.decode(token);
    if (!decodedToken || typeof decodedToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }

    const team: Team = await this.teamModel.findOne({
      uniqueCode: data.uniqueCode,
    });

    return await this.memberService.addMemberTeam(team.id, data.email, token);
  }

  async removeMember(data: DeleteMemberDto, token: string) {
    const decodedToken = this.jwtService.decode(token);
    if (!decodedToken || typeof decodedToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }

    const team: Team = await this.teamModel.findOne({
      uniqueCode: data.uniqueCode,
    });

    const deleteResponse: DeleteResponse = await this.memberService.removeMember(team.id, data.email);

    if (deleteResponse.deletedCount === 1) {

      return { message: 'Miembro eliminado exitosamente', statusCode: 200 };
    } else {
      return { message: 'No se pudo eliminar el Miembro', statusCode: 404 };
    }
  }

  async getTeamsFreeByProyect(id_proyect: string, token: string){
    const decodedToken = this.jwtService.decode(token);
    if (!decodedToken || typeof decodedToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }

    const listTeamsProyect: TeamProyect[] = await fetchTeamsOtherBackend(token, id_proyect);

    const listTeams: Team[] = await this.findAll(token);
    

    const teamsFree = listTeams.filter(team => !listTeamsProyect.some(proyectTeam => proyectTeam.name === team.name));

    return teamsFree;
  }

  async assignRol(id_team: string,data: AssingRolMemberDto, token: string) {
    const decodedToken = this.jwtService.decode(token);
    if (!decodedToken || typeof decodedToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }
    const rol: Rol = await this.rolService.findOneId(data.id_rol, token);

    return await this.memberService.assignRol(rol.name,data.emailMember, id_team);
  }
}
