import { Entity_Entity } from "src/modules/entity/domain/entities/entity.entity"
import { Talento_Artistico_Contratado_Entity } from "../../talentos/talento_contratado/talento_contratado.entity"
import { Nomenclador_Clasifica_ProgramasSociales, Nomenclador_EstadosDeActividadCultural, Nomenclador_GrupoEtareo } from "src/cultura/codificadores-cult/enums/codificadores"
import { NomenclaCat_ContManifestacion_Especialidad_Entity } from "src/cultura/categorias-contrat-mancul/n_catgcont-m_espc/schemas/n_catgcont-m_espc.entity"
import { ProgramaSocial_Entity } from "src/cultura/programas/schemas/prog_socl.entity"

export class Control_ActividadCultural_Entity {
    id:string
    name:string
    dia_actcult:string// Date
    hora_actcult:string  // DateTimestamp
    entidad_responsable:string //quien planifica Entity_Entity
    lugar_planificado:String // InstCult | ConsjPop | ComnTransf
    edad:Nomenclador_GrupoEtareo //grupo etareo
    edad_asitencia:Number //cantidad
    tipoActividad_extraPlan?:boolean //no 
    tipoActividad_Prov_Entidad?:Entity_Entity //null o entidad prov only
    estados_actividad?:Estado_ActividadCultural[] //estado actividad
    //justifica_motivo?:String //justifica No se hizo, Fin 1ra opcion
    manifestaciones_artisticas:string[] //NomenclaCat_ContManifestacion_Especialidad_Entity[]//manifestaciones implicadas, la principal es la primera
    talentos:Talento_Artistico_Contratado_Entity[]//talentos contratados
    programas_tributa:string[] //ProgramaSocial_Entity[] //programas sociales entity
    descripcion_actv?:String //descripcion de la actividad
    TV?:boolean
    redes_plataforma?:boolean
    apoyos?:Talento_Artistico_Contratado_Entity[]//talentos contratados

      isDeleted: boolean;
    
      createdAt: Date;
    
      updatedAt: Date;
}

export class Estado_ActividadCultural{
    estado_actividad:Nomenclador_EstadosDeActividadCultural; //estado actividad
    responsable:string;
    justificacion:string;
}
