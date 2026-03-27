import { ApiProperty } from "@nestjs/swagger"
import { isMongoId, IsMongoId, isNotEmpty, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { NomenclaCat_ContManifestacion_Especialidad_Entity } from "src/cultura/categorias-contrat-mancul/n_catgcont-m_espc/schemas/n_catgcont-m_espc.entity"
import { NomenclaCategorias_ContManifestacion_Especialidad_Model } from "src/cultura/categorias-contrat-mancul/n_catgcont-m_espc/schemas/n_catgcont-m_espc.schema"
import { Nomenclador_Clasifica_ContratoTalento } from "src/cultura/codificadores-cult/enums/codificadores"
import { ApiPaginatedResponse } from "src/modules/common/doc/api-paginated-response.decorator"
import { Entity_Entity } from "src/modules/entity/domain/entities/entity.entity"
import { Create_Talento_Artistico_Dto } from "./create-talentos.dto"
import { IsRelationShipWith } from "src/modules/common/decorators/validateIdExistence"
import { EntityModel } from "src/modules/entity/infrastructure/entity.schema"
import { Talento_Artistico_Model } from "../schemas/talentos.schema"

export class Remove_Talento_Artistico_Dto {
    @IsMongoId()
    @IsRelationShipWith(Talento_Artistico_Model)
    @IsNotEmpty()
    id:string

    
}