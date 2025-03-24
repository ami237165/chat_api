import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    //create use
    async createUser(mobileNumber: string, password: string): Promise<User> {
        const user = this.userRepository.create({ mobileNumber, password });
        return this.userRepository.save(user)
    }

    //find users 
    async fineOne(mobileNumber: string,): Promise<any> {
       return await this.userRepository.findOne({ where: { mobileNumber: mobileNumber } }).then((res) => {
            if (res) {
                return res
            } else {
                return "user not found"
            }
        }).catch((error) => {
            return error
        });

    }

    // find all users
    async fineAll(): Promise<any> {
        return await this.userRepository.find().then((res) => {
             if (res) {
                 return res
             } else {
                 return "user not found"
             }
         }).catch((error) => {
             return error
         });
 
     }
}
