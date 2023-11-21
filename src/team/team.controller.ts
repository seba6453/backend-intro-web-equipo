import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { CreateUserTeamDto } from './dto/create-user-team.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';


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

  @Get()
  findAll(@Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.teamService.findAll(token);
  }

  @Get(':uniquecode')
  findOne(@Param('uniquecode') uniquecode: string, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.teamService.findOne(uniquecode, token);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.teamService.update(id, updateTeamDto, token);
  }

  @Delete(':uniquecode')
  remove(@Param('uniquecode') uniquecode: string, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.teamService.remove(uniquecode,token);
  }

  @Post('adduser')
  addUser(@Body() data: CreateUserTeamDto, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.teamService.addUser(data.email,data.uniqueCode,token);
  }

  @Post('remove-user/:uniqueCode/:email')
  removeUser(@Param('uniqueCode') uniqueCode: string, @Param('email') email: string) {
    return this.teamService.removeUser(email, uniqueCode);
  }
}
