import { Prop } from "@nestjs/mongoose"
import { NomenclaCategorias_ContratacionManifestacion_Entity } from "../../n_catgcont-m/schemas/n_catcont-m.entity"

export class NomenclaCat_ContManifestacion_Especialidad_Entity
  {
    id:string
    nombre_categoria_manifestacion_especialidad :string
    categoria_manifestacion: NomenclaCategorias_ContratacionManifestacion_Entity
    isDeleted:boolean    
    createdAt:Date
    updatedAt:Date
}