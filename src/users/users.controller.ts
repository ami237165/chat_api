import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  //register user 
  @Post('register')
  async registerUser(@Body() data: User) {
    const user = await this.usersService.createUser(data.mobileNumber, data.password);
    return { message: 'User registered successfully', user };
  }

  //findOne user
  @Post('find')
  async fineOne(@Body() data: any) {
    console.log("comming");
    
    return await this.usersService.fineOne(data.mobileNumber)
  }

  //findall user
  @UseGuards(AuthGuard)
  @Get('findAll')
  async findAll(@Request() req) { 
    console.log(req.user);
       
    return await this.usersService.fineAll()
  }
}
