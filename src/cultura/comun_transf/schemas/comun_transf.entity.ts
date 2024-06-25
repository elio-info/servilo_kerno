import { Telefonos_Type_Dto } from "src/cultura/codificadores-cult/infrastructure/telefonos.dto"

export class Comunidad_Transformacion_Entity {
    id:string
    nombre:string
    consejopopular_municipality:string
    // municipality:string
    // province:string
    responsable:string
    telefonos:Telefonos_Type_Dto
}
