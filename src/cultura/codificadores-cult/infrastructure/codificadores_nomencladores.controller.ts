import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiHeader, ApiTags } from "@nestjs/swagger";
import { Clasifica_Nivel_EntidadCultural, Nomenclador_Clasifica_ContratoTalento, Nomenclador_EstadosDeActividadCultural, Nomenclador_GrupoEtareo, Nomenclador_TiposDeActividadCultural } from "../enums/codificadores";
import { Anonymous } from "src/modules/authz/decorators/anonymous.decorator";

@Controller('nomenclador')
@ApiHeader({
    name: 'Authorization',
    description: 'Bearer theJsonWebToken',
  })
  @ApiBearerAuth()
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

    @Get('nivel-entidadcultural')
    nivelEntidadCultural() {
        return Clasifica_Nivel_EntidadCultural
    }
    
    @Get('tipo-estadoactvcultural')
    tipoEstadoActividadCultural() {
        return Nomenclador_EstadosDeActividadCultural
    }
}