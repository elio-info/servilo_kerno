import { Controller, Get } from "@nestjs/common";
 
@Controller('app')
export class AppController{
    constructor( ){}

    @Get('hell')
    getHell(){
       return "Hell, nop? Buscar respuestas"
    }
}