import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberReques {
    @IsNotEmpty()
    @IsString()
    uniqueCode: string;

    @IsEmail()
    @IsNotEmpty()
    email: string
}