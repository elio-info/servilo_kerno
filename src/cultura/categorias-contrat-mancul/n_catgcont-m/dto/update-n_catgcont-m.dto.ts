import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Create_NomenclaCategorias_ContratacionManifestacion_Dto } from './create-n_catgcont-m.dto';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsDate, MinLength, IsMongoId } from 'class-validator';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { NomenclaCategorias_ContratacionManifestacion_Model } from '../schemas/n_catgcont-m.schema';

export class Update_NomenclaCategorias_ContratacionManifestacion_Dto {
    @ApiProperty({
        example:'665f7c4808023e4c264a4f9b',
        description:`Esta el la llave del Objeto que se trabajara en cuestion`
    })
    @IsMongoId()
    @IsRelationShipWith(NomenclaCategorias_ContratacionManifestacion_Model)
    @IsString()
    id:string    
    
    @IsOptional()
    @ApiProperty({
        example:'Danza', 
        description:'Nombre del Nomenclador. Ej: música, danza, audio, transporte, luces, etc.'        
    })
    @IsNotEmpty({message:'El tipo de categoria no puede ser vacio.'})
    @IsString({message:'El nomenclador no puede ser numeral o caracter especial'})
    @MinLength(3)
    name :string
    
    @IsOptional()
    @ApiProperty({
        example: true,
        description: `Que sea de apoyo es que no sea de cultura propiamente: 
                          <br>  Si: luces, transporte 
                          <br>  No: danza, teatro                         
                        <br>  Este campo es Falso por defecto.                                          
                        `
    })@IsBoolean({
        message:'Solo Si o No'
    })
    apoyo_categoria_manifestacion:boolean    

    @IsOptional()
    @IsBoolean()
    isDeleted: boolean;
}
