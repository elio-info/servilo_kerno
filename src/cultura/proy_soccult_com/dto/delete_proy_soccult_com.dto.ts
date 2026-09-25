import { IsMongoId, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { Type } from 'class-transformer';
import { Proyecto_Sociocultural_Comunitario_Model } from '../schemas/proy_soccult_com.schema';

export class Remove_Proyecto_Sociocultural_Comunitario_Dto {
    
    @ApiProperty({ 
        example:'66763c9511dbc2cb96b53d4d'})
    @IsMongoId()
    @IsString({ message: 'The Id of the proyecto soc com must be a String' })
    @IsRelationShipWith(Proyecto_Sociocultural_Comunitario_Model)
    // @IsNotEmpty({ message: 'The Consejo Popular ID cannot be empty' }) 
    @Type(()=>Proyecto_Sociocultural_Comunitario_Model) 
    id:string;
}
