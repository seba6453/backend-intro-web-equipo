import { Body, Controller, Delete, Get, HttpException, Param, Post, Req } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

@ApiTags('Rol')
@ApiBearerAuth()
@Controller('rol')
export class RolController {
    constructor(private rolService: RolService) {}

    @ApiOperation({ summary: 'Obtiene todos los roles de un equipo' })
    @Get()
    async findAll(@Req() request: Request) {
        try {
            const token = request.headers['authorization']?.split(" ")[1];
            if (!token) {
                throw new HttpException('Token de autorización no proporcionado', HttpStatusCode.Unauthorized);
            }
            
            return await this.rolService.getAll(token);
        } catch (error) {
            console.error('Error en findAll:', error);
            throw new HttpException('No fue posible obtener los roles', HttpStatusCode.BadRequest);
        }
    }

    @ApiOperation({ summary: 'Crea un rol' })
    @Post()
    async createRol(@Body() newRol: CreateRolDto, @Req() request: Request) {
        try {
            const token = request.headers['authorization']?.split(" ")[1];
            if (!token) {
                throw new HttpException('Token de autorización no proporcionado', HttpStatusCode.Unauthorized);
            }

            return await this.rolService.create(newRol, token);
        } catch (error) {
            console.error('Error en createRol:', error);
            throw new HttpException('No fue posible crear el rol', HttpStatusCode.BadRequest);
        }
    }

    @ApiOperation({ summary: 'Elimina un rol' })
    @Delete(':id')
    async delete(@Param('id') id: string, @Req() request: Request) {
        try {
            const token = request.headers['authorization']?.split(" ")[1];
            if (!token) {
                throw new HttpException('Token de autorización no proporcionado', HttpStatusCode.Unauthorized);
            }

            return await this.rolService.delete(id, token);
        } catch (error) {
            console.error('Error en delete:', error);
            throw new HttpException('No fue posible eliminar el rol', HttpStatusCode.BadRequest);
        }
    }
}
