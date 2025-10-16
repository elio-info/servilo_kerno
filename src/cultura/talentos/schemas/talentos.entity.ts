import { Prop } from "@nestjs/mongoose";
import { Nomencla_CategoriasContratacionManifestacion_Especialidad_Clss } from "src/cultura/categorias-contrat-mancul/n_catgcont-m_espc/schemas/n_catgcont-m_espc.entity";
import { Nomenclador_Clasifica_ContratoTalento } from "src/cultura/codificadores-cult/enums/codificadores";
import { Entity } from "src/modules/entity/domain/entities/entity.entity";

export class Talento_Artistico_Entity {
    id:string
    nombre_TalentoArtistico :string
    
    manifest_esp:Nomencla_CategoriasContratacionManifestacion_Especialidad_Clss

    entidad_talento:Entity
     
    @Prop({  default:false })
    persona_TalentoArtistico:boolean
    //Nomenclador_Clasifica_ContratoTalento
    @Prop({  default:'A' })
    contrato_talento: Nomenclador_Clasifica_ContratoTalento
    @Prop({  default:false })
    isDeleted:boolean
    createdAt: Date;  
    updatedAt: Date;
}
