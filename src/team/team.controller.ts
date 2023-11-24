import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { CreateMemberReques } from './dto/create-user-team.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeleteMemberDto } from 'src/member/dto/delete-member.dto';
import { AssingRolMemberDto } from 'src/member/dto/assing-rol-member.dto';


@ApiTags('Team')
@ApiBearerAuth()
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiOperation({ summary: 'Crea un nuevo equipo' })
  @Post()
  create(@Body() createTeamDto: CreateTeamDto, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.teamService.create(createTeamDto, token);
  }

  @ApiOperation({ summary: 'Obtiene todos los equipos que pertenece un usuario' })
  @Get()
  findAll(@Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.teamService.findAll(token);
  }

  @ApiOperation({ summary: 'Obtiene solo 1 equipo' })
  @Get(':uniquecode')
  findOne(@Param('uniquecode') uniquecode: string, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.teamService.findOne(uniquecode, token);
  }

  @ApiOperation({ summary: 'Actualiza un equipo' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.teamService.update(id, updateTeamDto, token);
  }

  @ApiOperation({ summary: 'Elimina un equipo' })
  @Delete(':uniquecode')
  remove(@Param('uniquecode') uniquecode: string, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.teamService.remove(uniquecode,token);
  }

  @ApiTags('Member')
  @ApiOperation({ summary: 'Agrega un miembro a un equipo' })
  @Post('member/adduser')
  addUser(@Body() data: CreateMemberReques, @Req() request: Request) {
      const token = request.headers['authorization'].split(" ")[1];
      return this.teamService.addMemberTeam(data,token);
  }

  @ApiTags('Member')
  @ApiOperation({ summary: 'Elimina un miembro de un equipo' })
  @Post('member/remove-user')
  removeUser(@Body() data: DeleteMemberDto, @Req() request: Request) {
      const token = request.headers['authorization'].split(" ")[1];
      return this.teamService.removeMember(data, token);
  }

  @ApiTags('Member')
  @ApiOperation({ summary: 'Obtiene todos los miembros de un equipo' })
  @Get('member/:id_team')
  async getMemberByTeam(@Param('id_team') id_team: string, @Req() request: Request) {
      const token = request.headers['authorization'].split(" ")[1];
      return await this.teamService.getMemberByTeam(id_team, token);
  }

  @Get('teamfree/:id_proyect')
  async getTeamsFreeByProyect(@Param('id_proyect') id_proyect: string, @Req() request: Request) {
      const token = request.headers['authorization'].split(" ")[1];
      return await this.teamService.getTeamsFreeByProyect(id_proyect, token);
  }

  @Post('member/assingrol/:id_team')
  async assignRol(@Param('id_team') id_team: string,@Body() data: AssingRolMemberDto, @Req() request: Request) {
      const token = request.headers['authorization'].split(" ")[1];
      return await this.teamService.assignRol(id_team, data, token);
  }
}
