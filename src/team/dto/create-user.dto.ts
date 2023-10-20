import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    _id: string

    @IsNotEmpty()
    @IsString()
    userName: string

    @IsEmail()
    @IsNotEmpty()
    email: string
}