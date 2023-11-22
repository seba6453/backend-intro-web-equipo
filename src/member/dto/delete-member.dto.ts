import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteMemberDto {
    @IsString()
    @IsNotEmpty()
    uniqueCode: string;

    @IsString()
    @IsNotEmpty()
    email: string;
}