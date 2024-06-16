import { Module } from "@nestjs/common";
import { Nomencla_CodificadoresCulturales_Module } from "./codificadores-cult/nomencla_codificadores-cultura.module";
import { Nomencla_Categorias_ContratacionManifestacion_Module } from "./categorias-contrat-mancul/n_catgcont-m/n_catgcont-m.module";
import { Nomencla_Categorias_ContratacionManifestacion_Especialidad_Module } from "./categorias-contrat-mancul/n_catgcont-m_espc/n_catgcont-m_espc.module";

@Module({
    imports:[
        Nomencla_CodificadoresCulturales_Module,
        Nomencla_Categorias_ContratacionManifestacion_Module,
        Nomencla_Categorias_ContratacionManifestacion_Especialidad_Module
    ]
})
export class CulturaModule {}