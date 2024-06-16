import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Create_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto } from './create-n_catgcont-m_espc.dto';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsDate, MinLength, IsMongoId } from 'class-validator';

export class Update_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto extends PartialType(Create_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto) {
    // @ApiProperty({
    //     example:'665f7c4808023e4c264a4f9b',
    //     description:`Esta el la llave del Objeto que se trabajara en cuestion`
    // })
    // @IsString()
    // _id:string
    
    @ApiProperty({
        example:'Folklorica', 
        description:'Nombre del Nomenclador especialidad que depende de la Manifestacion Música.'        
    })
    @IsOptional()
    @IsNotEmpty({message:'El tipo de categoria no puede ser vacio.'})
    @IsString({message:'El nomenclador no puede ser numeral o caracter especial'})
    @MinLength(3)
    nombre_categoria_manifestacion_especialidad :string

    @ApiProperty({ example: '666a2f9d001740325f7923d4' })
    @IsMongoId()
    @IsString({ message: 'The Id of the Manifestacion must be a String' })
    // @IsRelationShipWith(Nomencla_Categorias_ContratacionManifestacion)
    @IsNotEmpty({ message: 'The Province ID cannot be empty' })
    ID_categoria_manifestacion: string

    @IsOptional()
    @ApiProperty({
        example: false,
        description:'Solo Si o No',
        type:Boolean,
        default:false
    })
    @IsBoolean()
    isDeleted:boolean
    
    @IsOptional()
    @IsDate()
    updatedAt: Date
}
