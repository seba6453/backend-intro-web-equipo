import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberDto {
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    id_team: string;

    @IsString()
    @IsNotEmpty()
    rol: string;
}
