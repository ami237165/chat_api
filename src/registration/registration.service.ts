import { Injectable } from '@nestjs/common';
import { RegDto } from './dtos/reg.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { hashUtil } from 'src/utils/pass.hash';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //new user registeration
  async newRegisteration(body: RegDto): Promise<any> {
    console.log("kvcvbnm,.");
    
    return new Promise(async (resolve, reject) => {
      try {
        console.log("body.password ,",body);
        
        let hashedPassword = await hashUtil.hashPassword(body.password);
        console.log("hashedPassword ,",hashedPassword);
        

        let newUser = this.userRepository.create({
          ...body,
          password: hashedPassword,
        });
        this.userRepository
          .save(newUser)
          .then((res) => {
            resolve({data:"success"});
          })
          .catch((err) => {
            if (
              err.code === 'ER_DUP_ENTRY' &&
              err.sqlMessage?.includes(body.mobileNumber)
            ) {
              resolve({data:`Mobile Number ${body.mobileNumber} Already Exist.`});
            }

            resolve(err);
          });
      } catch (error) {
        console.log('erro in main cath ,',error);

        resolve(error);
      }
    });
  }
}
