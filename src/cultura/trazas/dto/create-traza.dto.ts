import { IsNotEmpty, IsString } from "class-validator";
import { Traza } from "../entities/traza.entity";

/**
 * Valores que posee 
 *  modulo:string //a donde se accedio
 *   accion:string //que se hizo
 *   consulta?: string //HTTP Request
 *   estadoConsulta?: string //statusCode
 *  metodo?:string //method
 *   user?:string //nombre y rol
 *  fecha?:Date //fecha hora
 */
export class CreateTrazaDto extends Traza {
    @IsString()
    @IsNotEmpty()
    modulo:string //a donde se accedio
    @IsString()
    @IsNotEmpty()
    accion:string //que se hizo

    @IsString()    
    consulta?: string //HTTP Request
    @IsString() 
    estadoConsulta?: string //statusCode
    @IsString() 
    metodo?:string //method
    user?:string //nombre y rol
    fecha?:Date //fecha hora
}
