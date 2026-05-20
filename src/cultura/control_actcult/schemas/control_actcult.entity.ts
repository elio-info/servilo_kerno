import { Talento_Artistico_Contratado_Entity } from "../../talentos/talento_contratado/talento_contratado.entity"
import { Nomenclador_EstadosDeActividadCultural, Nomenclador_GrupoEtareo } from "src/cultura/codificadores-cult/enums/codificadores"

export class Control_ActividadCultural_Entity {
    id:string
    name:string
    dia_actcult:string// Date
    hora_actcult:string  // DateTimestamp
    entidad_responsable:string //quien planifica Entity_Entity
    lugar_planificado?:String //Place
    ic_planificado?:String// InstCult
    cp_planificado?:String// ConsjPop
    ct_planificado?:String// ComnTransf
    ps_planificado?:String// ProySoccultCom
    
    edad:Nomenclador_GrupoEtareo //grupo etareo
    edad_asistencia:Number //cantidad
    tipoActividad_extraPlan?:boolean //no 
    tipoActividad_Prov_Entidad?:string //Entity_Entity //null o entidad prov only
    estados_actividad:Estado_ActividadCultural //estado actividad
    manifestaciones_artisticas:string[] //NomenclaCat_ContManifestacion_Especialidad_Entity[]//manifestaciones implicadas, la principal es la primera
    talentos:Talento_Artistico_Contratado_Entity[]//talentos contratados
    programas_tributa:string[] //ProgramaSocial_Entity[] //programas sociales entity
    TV?:boolean
    redes_plataforma?:boolean
    apoyos?:Talento_Artistico_Contratado_Entity[]//talentos contratados

      isDeleted: boolean;    
      createdAt: Date;    
      updatedAt: Date;
}

export class Estado_ActividadCultural{
    estado_actividad: Nomenclador_EstadosDeActividadCultural; //estado actividad
    responsable:string;
    justificacion:string;
}
