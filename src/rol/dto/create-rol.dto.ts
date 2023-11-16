import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRolDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    id_team: string;
}
