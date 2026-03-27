import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, MinLength } from 'class-validator';

export class Search_NomenclaCategorias_ContratacionManifestacion_Dto {
    @IsOptional()
    @IsBoolean()
    exactName: boolean=true;    
    @IsOptional()
    @ApiProperty({
        example:'Danza', 
        description:'Nombre del Nomenclador. Ej: música, danza, audio, transporte, luces, etc.'        
    })@IsNotEmpty({message:'El tipo de categoria no puede ser vacio.'})
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
    isDeleted: boolean=false;
}
