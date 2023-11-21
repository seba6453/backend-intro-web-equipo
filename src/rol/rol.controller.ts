import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { BodyRol } from './dto/body-rol.dto';



@Controller('rol')
export class RolController {
    constructor(
        private rolService: RolService
    ){}

    @Get()
    findAll(@Body() bodyRol: BodyRol, @Req() request: Request){
        const token = request.headers['authorization'].split(" ")[1];
        return this.rolService.getAllByProyect(bodyRol.id_team,token);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() request: Request){
        const token = request.headers['authorization'].split(" ")[1];
        return this.rolService.findOneId(id, token);
    }

    @Post()
    createRol(@Body() newRol: CreateRolDto, @Req() request: Request) {
        const token = request.headers['authorization'].split(" ")[1];
        return this.rolService.create(newRol, token);
    }
}
