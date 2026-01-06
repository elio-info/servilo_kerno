import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { TrazaEntity } from "../entities/traza.entity";

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
export class CreateTrazaDto extends TrazaEntity {
    @IsObject()
    @IsNotEmpty()
    user:Object //nombre y rol
    
    @IsString()
    @IsNotEmpty()
    collection:string //a donde se accedio

    @IsString()
    @IsNotEmpty()
    operation:string //que se hizo

    @IsObject()
    error?:Object //error

    @IsObject()    
    filter?: Object //condiciones

    @IsObject()    
    before?: Object //condiciones

    @IsObject() 
    update?: Object //despues
    
}
