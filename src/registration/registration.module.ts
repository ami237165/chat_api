import { Module } from "@nestjs/common";
import { RegistrationService } from "./registration.service";
import { RegisterationController } from "./registration.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers:[RegisterationController],
    providers:[RegistrationService],

})
export class RegisterationModule{}