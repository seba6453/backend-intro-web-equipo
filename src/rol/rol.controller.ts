import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { BodyRol } from './dto/body-rol.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';



@ApiTags('Rol')
@ApiBearerAuth()
@Controller('rol')
export class RolController {
    constructor(
        private rolService: RolService
    ){}

    @ApiOperation({ summary: 'Obtiene todos los roles de un equipo' })
    @Get()
    findAll(@Body() bodyRol: BodyRol, @Req() request: Request){
        const token = request.headers['authorization'].split(" ")[1];
        return this.rolService.getAllByProyect(bodyRol.id_team,token);
    }

    @ApiOperation({ summary: 'Obtiene 1 rol' })
    @Get(':id')
    findOne(@Param('id') id: string, @Req() request: Request){
        const token = request.headers['authorization'].split(" ")[1];
        return this.rolService.findOneId(id, token);
    }

    @ApiOperation({ summary: 'Crea un rol' })
    @Post()
    createRol(@Body() newRol: CreateRolDto, @Req() request: Request) {
        const token = request.headers['authorization'].split(" ")[1];
        return this.rolService.create(newRol, token);
    }

    @ApiOperation({ summary: 'Elimina un rol' })
    @Delete(':id')
    delete(@Param('id') id: string, @Req() request: Request){
        const token = request.headers['authorization'].split(" ")[1];
        return this.rolService.delete(id, token);
    }
}
