import { JwtService } from '@nestjs/jwt';
import { User } from 'src/team/entities/user.entity';

export function decodeToken(token: string, jwtService: JwtService): User {

    const decodedToken = jwtService.decode(token) as { username: string; email: string } | null;
    
    if (!decodedToken || typeof decodedToken !== 'object') {
        throw new Error('Token inválido o no contiene información del usuario.');
    }

    const { username, email } = decodedToken;

    return { userName: username, email };
}