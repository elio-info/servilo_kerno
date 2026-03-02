import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Create_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto } from './create-n_catgcont-m_espc.dto';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsDate, MinLength, IsMongoId } from 'class-validator';
import { NomenclaCategorias_ContratacionManifestacion_Model } from '../../n_catgcont-m/schemas/n_catgcont-m.schema';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';

export class Search_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto  {
       
    @IsOptional()
    @IsBoolean()
    exactName?:Boolean=true;

    @ApiProperty({
        example:'Folklorica', 
        description:'Nombre del Nomenclador especialidad que depende de la Manifestacion Música.'        
    })
    @IsOptional()
    @IsNotEmpty({message:'El tipo de categoria no puede ser vacio.'})
    @IsString({message:'El nomenclador no puede ser numeral o caracter especial'})
    @MinLength(3)
    name :string

    @IsOptional()
    @ApiProperty({ example: '666a2f9d001740325f7923d4' })
    @IsMongoId()
    @IsString({ message: 'The Id of the Manifestacion must be a String' })
    @IsRelationShipWith(NomenclaCategorias_ContratacionManifestacion_Model)
    @IsNotEmpty({ message: 'The categoria_manifestacion cultural ID cannot be empty' })
    categoria_manifestacion: string

    @IsOptional()
    @ApiProperty({
        example: false,
        description:'Solo Si o No',
        type:Boolean,
        default:false
    })
    @IsBoolean()
    isDeleted:boolean
    
   
}
