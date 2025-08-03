import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { hashUtil } from 'src/utils/pass.hash';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto): Promise<{ access_token: string } | any> {
    const user = await this.usersService.fineOne(signInDto.mobileNumber);
   
    const isValid = await hashUtil.comparePassword(
      signInDto.password,
      user.password,
    );
    if (!isValid) {
     return { message: 'wrong username or password' };
    }
   

    const payload = {
      id: user.id,
      mobileNumber: user.mobileNumber,
      name: user.name,
    };
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
