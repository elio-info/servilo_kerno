import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Talento_Artistico_Contratado_Entity } from "../../talentos/talento_contratado/talento_contratado.entity";
import { EntityModel } from "src/modules/entity/infrastructure/entity.schema";
import { Type } from "class-transformer";
import { ProgramaSocial_Model } from "src/cultura/programas/schemas/prog_socl.schema";
import { PlaceModel } from "src/modules/place/infrastructure/place.schema";
import { Nomenclador_EstadosDeActividadCultural, Nomenclador_GrupoEtareo } from "src/cultura/codificadores-cult/enums/codificadores";
import { Estado_ActividadCultural } from "./control_actcult.entity";
import { NomenclaCategorias_ContratacionManifestacion_Model } from "src/cultura/categorias-contrat-mancul/n_catgcont-m/schemas/n_catgcont-m.schema";
import { ConsejoPopular_Municipality_Model } from "src/cultura/consejo_popular/domain/schemas/consejo_popular.schema";
import { Comunidad_Transformacion_Model } from "src/cultura/comun_transf/schemas/comun_transf.schema";

@Schema({ timestamps:true, collection:'control_actividadcultural'})
export  class Control_ActividadCultural_Model{
    _id:Types.ObjectId

    @Prop({required:true,
        unique:true
    })
    name:string

    @Prop({required:true , minlength:10, maxlength:10 })
    dia_actcult:string

    @Prop({required:true, minlength:5, maxlength:5
    })
    hora_actcult:string  //Timestamp

    @Prop({type:Types.ObjectId,ref:EntityModel.name})
    @Type(()=>EntityModel)
    entidad_responsable:string
    
    @Prop({type:Types.ObjectId,ref:PlaceModel.name, required:false})
    @Type(()=>PlaceModel)    
    lugar_planificado?:String //PlaceModel Place
    
    @Prop({type:Types.ObjectId,ref:EntityModel.name, required:false})
    @Type(()=>EntityModel)    
    ic_planificado?:String// InstCult

    @Prop({type:Types.ObjectId,ref:ConsejoPopular_Municipality_Model.name, required:false})
    @Type(()=>ConsejoPopular_Municipality_Model)    
    cp_planificado?:String// ConsjPop
    
    @Prop({type:Types.ObjectId,ref:Comunidad_Transformacion_Model.name, required:false})
    @Type(()=>Comunidad_Transformacion_Model)    
    ct_planificado?:String// ComnTransf

    @Prop({enum:Nomenclador_GrupoEtareo,default:Nomenclador_GrupoEtareo.N, type:String})
    edad:Nomenclador_GrupoEtareo //grupo etareo
        
    @Prop({type:Number,min:1, required:true})
    edad_asistencia:number //cantidad

    @Prop({ default:false})    
    tipoActividad_extraPlan:boolean //no 

    @Prop({type:Types.ObjectId,ref:EntityModel.name})
    @Type(()=>EntityModel)    
    tipoActividad_Prov_Entidad?:string //EntityModel //null o entidad prov only
    
    @Prop({
           type:[Estado_ActividadCultural],
           default:{estado_actividad:Nomenclador_EstadosDeActividadCultural.S, //estado actividad
               responsable:'string',
               justificacion:'string'}
        })
    estados_actividad?:Estado_ActividadCultural[] //estado actividad
        
   // justifica_motivo?:String //justifica No se hizo, Fin 1ra opcion
    
    @Prop({
           type:[{
            type: Types.ObjectId, ref: NomenclaCategorias_ContratacionManifestacion_Model.name}]
        })
    manifestaciones_artisticas:string[]//NomenclaCat_ContManifestacion_Especialidad_Entity[]//manifestaciones implicadas, la principal es la primera
        
    @Prop([{ type:Types.ObjectId, ref: ProgramaSocial_Model.name}])
    //@Type(()=>ProgramaSocial_Model)
    programas_tributa:string[]//ProgramaSocial_Model[]

    @Prop([Talento_Artistico_Contratado_Entity])
    talentos:Talento_Artistico_Contratado_Entity[]
    
    @Prop([Talento_Artistico_Contratado_Entity])
    apoyos?:Talento_Artistico_Contratado_Entity[]

    @Prop({default: false, select: false || true })
    TV: boolean=false;

   @Prop({default: false, select: false || true })
    redes_plataforma: boolean=false;
   
    @Prop({default: false, select: false || true })
    isDeleted: boolean=false;
  
    @Prop()
    createdAt: Date;
  
    @Prop()
    updatedAt: Date;
}

export const Control_ActividadCultural_Schema=SchemaFactory.createForClass(Control_ActividadCultural_Model)

export type Control_ActividadCultural_Document= Control_ActividadCultural_Model & Document

