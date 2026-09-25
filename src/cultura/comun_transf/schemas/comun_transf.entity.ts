import { ConsejoPopular_Municipality_Model } from "src/cultura/consejo_popular/domain/schemas/consejo_popular.schema"

export class Comunidad_Transformacion_Entity {
    id:string
    name:string
    consejopopular_municipality:ConsejoPopular_Municipality_Model
    //municipio:string
    observacion:string
    responsable:string
    telefonos:string
    isDeleted:boolean
    createdAt: Date;
    updatedAt: Date;
    
}


