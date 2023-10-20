import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserTeamDto {
    @IsNotEmpty()
    @IsString()
    uniqueCode: string

    @IsEmail()
    @IsNotEmpty()
    email: string
}