import { Prop } from "@nestjs/mongoose";

export class Nomencla_Categorias_ContratacionManifestacion_Clss {
    id:string
    nombre_categoria_manifestacion :string
    @Prop({  default:false })
    apoyo_categoria_manifestacion:boolean
    createdAt: Date;  
    updatedAt: Date;
}