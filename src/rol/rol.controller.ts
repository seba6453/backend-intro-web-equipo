import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';



@Controller('rol')
export class RolController {
    constructor(
        private rolService: RolService
    ){}

    @Get()
    findAll(){
        return this.rolService.getAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string ){
        return this.rolService.findOneId(id);
    }

    @Post()
    createRol(@Body() newRol: CreateRolDto) {
        return this.rolService.create(newRol);
    }
}
