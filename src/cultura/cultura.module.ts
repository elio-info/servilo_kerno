import { Module } from "@nestjs/common";
import { Nomencla_CodificadoresCulturales_Module } from "./codificadores-cult/nomencla_codificadores-cultura.module";
import { NomenclaCategorias_ContratacionManifestacion_Module } from "./categorias-contrat-mancul/n_catgcont-m/n_catgcont-m.module";
import { NomenclaCategorias_ContManifestacion_Especialidad_Module } from "./categorias-contrat-mancul/n_catgcont-m_espc/n_catgcont-m_espc.module";
import { Talento_Artistico_Module } from "./talentos/talentos.module";
import { Proyecto_Sociocultural_Comunitario_Module } from './proy_soccult_com/proy_soccult_com.module';
import { ConsejoPopular_Municipality_Module } from "./consejo_popular/consejo_popular.module";
import { Comunidad_Transformacion_Module } from "./comun_transf/comun_transf.module";
import { ProgramaSocial_Priorizado_Module } from "./programas/noUsar/prog_socl_prio/prog_socl_prio.module";
import { ProgramaSocial_Especial_Module } from "./programas/noUsar/prog_socl_esp/prog_socl_espc.module";
import { TrazasModule } from './trazas/trazas.module';
import { EntityService } from "src/modules/entity/application/entity.service";
import { EntityModule } from "src/modules/entity/entity.module";

@Module({
    imports:[
        EntityModule,

        ConsejoPopular_Municipality_Module,
        Nomencla_CodificadoresCulturales_Module,
        NomenclaCategorias_ContratacionManifestacion_Module,
       // NomenclaCategorias_ContManifestacion_Especialidad_Module,
        Comunidad_Transformacion_Module,        
        //ProgramaSocial_Priorizado_Module,ProgramaSocial_Especial_Module,
        Talento_Artistico_Module,
        Proyecto_Sociocultural_Comunitario_Module,
        TrazasModule
        
    ],
   // providers:[EntityService],
    exports:[TrazasModule]
})
export class CulturaModule {}