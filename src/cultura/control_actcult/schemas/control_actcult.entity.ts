import { Entity } from "src/modules/entity/domain/entities/entity.entity"
import { Talento_Artistico_Contratado_Entity } from "../../talentos/talento_contratado/talento_contratado.entity"
import { Nomenclador_Clasifica_ProgramasSociales, Nomenclador_EstadosDeActividadCultural, Nomenclador_GrupoEtareo } from "src/cultura/codificadores-cult/enums/codificadores"
import { Nomencla_CategoriasContratacionManifestacion_Especialidad_Clss } from "src/cultura/categorias-contrat-mancul/n_catgcont-m_espc/schemas/n_catgcont-m_espc.entity"

export class Control_ActividadCultural_Entity {
    id:string
    nombre_actcult:string
    dia_actcult:string// Date
    hora_actcult:string  // DateTimestamp
    Entidad_Responsable:Entity //quien planifica
    Lugar_planificado:String // InstCult | ConsjPop | ComnTransf
    edad:Nomenclador_GrupoEtareo //grupo etareo
    edad_asitencia:Number //cantidad
    tipoActividad_extraPlan:boolean //no 
    tipoActividad_Prov_Entidad:Entity //null o entidad prov only
    estado_actividad:Nomenclador_EstadosDeActividadCultural //estado actividad
    justifica_motivo:String //justifica No se hizo, Fin 1ra opcion
    manifestaciones_artisticas:Nomencla_CategoriasContratacionManifestacion_Especialidad_Clss[]//manifestaciones implicadas, la principal es la primera
    talentos:Talento_Artistico_Contratado_Entity[]//talentos contratados
    programas_tributa:Nomenclador_Clasifica_ProgramasSociales[] //programas sociales
    descripcion_actv:String //descripcion de la actividad
    TV:boolean
    redes_plataforma:boolean
    apoyos:Talento_Artistico_Contratado_Entity[]//talentos contratados
}
