import { Module } from "@nestjs/common";
import { Nomencla_CodificadoresCulturales_Module } from "./codificadores-cult/nomencla_codificadores-cultura.module";
import { Nomencla_Categorias_ContratacionManifestacion_Module } from "./categorias-contrat-mancul/n_catgcont-m/n_catgcont-m.module";
import { Nomencla_Categorias_ContratacionManifestacion_Especialidad_Module } from "./categorias-contrat-mancul/n_catgcont-m_espc/n_catgcont-m_espc.module";
import { Talento_Artistico_Module } from "./talentos/talentos.module";
import { Proyecto_Sociocultural_Comunitario_Module } from './proy_soccult_com/proy_soccult_com.module';
import { ConsejoPopular_Municipality_Module } from "./consejo_popular/consejo_popular.module";
import { Comunidad_Transformacion_Module } from "./comun_transf/comun_transf.module";
import { ProgramaSocial_Module } from "./programas/prog_socl/prog_socl.module";
import { ProgramaSocial_Especial_Module } from "./programas/prog_socl_esp/prog_socl_espc.module";

@Module({
    imports:[
        ConsejoPopular_Municipality_Module,
        Nomencla_CodificadoresCulturales_Module,
        Nomencla_Categorias_ContratacionManifestacion_Module,
        Nomencla_Categorias_ContratacionManifestacion_Especialidad_Module,
        Comunidad_Transformacion_Module,
        ProgramaSocial_Module,ProgramaSocial_Especial_Module,
        Talento_Artistico_Module,
        Proyecto_Sociocultural_Comunitario_Module
        
    ]
})
export class CulturaModule {}