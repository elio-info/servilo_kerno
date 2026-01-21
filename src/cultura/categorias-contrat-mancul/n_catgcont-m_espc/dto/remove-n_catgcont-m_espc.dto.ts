import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Create_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto } from './create-n_catgcont-m_espc.dto';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsDate, MinLength, IsMongoId } from 'class-validator';
import { NomenclaCategorias_ContratacionManifestacion_Model } from '../../n_catgcont-m/schemas/n_catgcont-m.schema';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { NomenclaCategorias_ContManifestacion_Especialidad_Model } from '../schemas/n_catgcont-m_espc.schema';

export class Remove_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto {
    @ApiProperty({
        example:'665f7c4808023e4c264a4f9b',
        description:`Esta el la llave del Objeto que se trabajara en cuestion`
    })
    @IsRelationShipWith(NomenclaCategorias_ContManifestacion_Especialidad_Model)
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    id:string 
    
}
