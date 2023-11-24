import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AssingRolMemberDto {
    @IsString()
    @IsNotEmpty()
    id_rol: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    emailMember: string;    
}
