import { Telefonos_Type_Dto } from "src/cultura/codificadores-cult/infrastructure/telefonos.dto"
import { Comunidad_Transformacion_Model } from "./comun_transf.schema"

export class Comunidad_Transformacion_Entity {
    id:string
    name:string
    consejopopular_municipality:string
    //municipio:string
    observacion:string
    responsable:string
    telefonos:string
    isDeleted:boolean
    createdAt: Date;
    updatedAt: Date;
    
}


