import { Prop } from "@nestjs/mongoose"
import { NomenclaCategorias_ContratacionManifestacion_Entity } from "../../n_catgcont-m/schemas/n_catcont-m.entity"

export class NomenclaCat_ContManifestacion_Especialidad_Entity
  {
    id:string
    name :string
    categoria_manifestacion: string //NomenclaCategorias_ContratacionManifestacion_Entity
    isDeleted:boolean    
    createdAt:Date
    updatedAt:Date
}