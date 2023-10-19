import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto, @Req() request: Request) {
    const token = request.headers['authorization'];
    return this.teamService.create(createTeamDto, token);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':uniquecode')
  findOne(@Param('uniquecode') uniquecode: string) {
    return this.teamService.findOne(uniquecode);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Delete(':uniquecode')
  remove(@Param('uniquecode') uniquecode: string) {
    return this.teamService.remove(uniquecode);
  }
}
