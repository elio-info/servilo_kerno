import { Prop } from "@nestjs/mongoose";
import { NomenclaCat_ContManifestacion_Especialidad_Entity } from "src/cultura/categorias-contrat-mancul/n_catgcont-m_espc/schemas/n_catgcont-m_espc.entity";
import { Nomenclador_Clasifica_ContratoTalento } from "src/cultura/codificadores-cult/enums/codificadores";
import { Entity_Entity } from "src/modules/entity/domain/entities/entity.entity";

export class Talento_Artistico_Entity {
    id:string
    name :string    
    manifest_esp:string // NomenclaCat_ContManifestacion_Especialidad_Entity
    entidad_talento:string //Entity_Entity     
    @Prop({  default:false })
    persona_TalentoArtistico:boolean
    //Nomenclador_Clasifica_ContratoTalento
    @Prop({  default:Nomenclador_Clasifica_ContratoTalento.A })
    contrato_talento: string
    @Prop({  default:false })
    isDeleted:boolean
    createdAt: Date;  
    updatedAt: Date;
}
