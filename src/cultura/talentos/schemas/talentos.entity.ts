import { Prop } from "@nestjs/mongoose";
import { Nomenclador_Clasifica_ContratoTalento } from "src/cultura/codificadores-cult/enums/codificadores";

export class Talento_Artistico {
    id:string
    nombre_TalentoArtistico :string
    //Nomencla_Categorias_ContratacionManifestacion_Clss.id
    manifestacion:string
    //Nomencla_CategoriasContratacionManifestacion_Especialidad_Clss.id
    especialidad:string   
    @Prop({  default:false })
    persona:boolean
    //Nomenclador_Clasifica_ContratoTalento
    @Prop({  default:'A' })
    contrato:Nomenclador_Clasifica_ContratoTalento
    @Prop({  default:false })
    isDeleted:boolean
    createdAt: Date;  
    updatedAt: Date;
}