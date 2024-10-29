export class Traza {
    modulo:string //a donde se accedio
    accion:string //que se hizo
    consulta?: string //HTTP Request
    estadoConsulta?: string //statusCode
    metodo?:string //method
    user?:string //nombre y rol
    fecha?:Date //fecha hora
}
