import { Prop } from "@nestjs/mongoose"
import { Nomencla_Categorias_ContratacionManifestacion_Clss } from "../../n_catgcont-m/schemas/n_catcont-m.entity"

export class Nomencla_CategoriasContratacionManifestacion_Especialidad_Clss
  {
    id:string
    nombre_categoria_manifestacion_especialidad :string
    ID_categoria_manifestacion: Nomencla_Categorias_ContratacionManifestacion_Clss
    @Prop({ default:false})
    isDeleted:boolean    
    createdAt:Date
    updatedAt:Date
}