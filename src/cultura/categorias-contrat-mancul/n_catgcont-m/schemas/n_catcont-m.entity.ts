import { Prop } from "@nestjs/mongoose";

export class NomenclaCategorias_ContratacionManifestacion_Entity {
    id:string
    nombre_categoria_manifestacion :string
    isDeleted:boolean;
    apoyo_categoria_manifestacion:boolean
    createdAt: Date;  
    updatedAt: Date;
}