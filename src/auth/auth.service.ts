import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService
    ) { }

    async signIn(signInDto): Promise<{ access_token: string } | any> {
console.log(signInDto);

        const user = await this.usersService.fineOne(signInDto.mobileNumber);

        if (user.password !== signInDto.password) {
           return {message:"wrong username or password"};
        }

        const payload = { sub: user.id, mobileNumber: user.mobileNumber };
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

}
