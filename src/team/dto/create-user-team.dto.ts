import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
    @IsNotEmpty()
    @IsString()
    uniqueCode: string;
    
    @IsString()
    @IsEmail()
    email: string;
}
