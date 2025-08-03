import { Body, Controller, Post } from "@nestjs/common";
import { RegistrationService } from "./registration.service";
import { RegDto } from "./dtos/reg.dto";

@Controller('registeration')
export class RegisterationController{
    constructor(private readonly regService:RegistrationService){}

    //new registeration endpoing
    @Post('new')
    async newRegisteration(@Body() body:RegDto):Promise<any>{
        return await this.regService.newRegisteration(body)
    }
}