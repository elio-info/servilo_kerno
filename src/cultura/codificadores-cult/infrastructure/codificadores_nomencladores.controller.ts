import { Controller, Get } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { Nomenclador_Clasifica_ContratoTalento, Nomenclador_EstadosDeActividadCultural, Nomenclador_GrupoEtareo, Nomenclador_TiposDeActividadCultural } from "../enums/codificadores";
import { Anonymous } from "src/modules/authz/decorators/anonymous.decorator";

@Controller('nomenclador')
@ApiTags('Nomencladores generales')
@Anonymous()
export class Nomencladores_Generales{  
    @Get('tipo-actvcultural')
    tipoActividadCultural() {
        return Nomenclador_TiposDeActividadCultural
    }

    @Get('tipo-grupoetareo')
    tipoGrupoEtareo() {
        return Nomenclador_GrupoEtareo
    } 
    
    @Get('tipo-contratotalento')
    tipoClasificionContratoTalento() {
        return Nomenclador_Clasifica_ContratoTalento
    }

    @Get('tipo-estadoactvcultural')
    tipoEstadoActividadCultural() {
        return Nomenclador_EstadosDeActividadCultural
    }
}