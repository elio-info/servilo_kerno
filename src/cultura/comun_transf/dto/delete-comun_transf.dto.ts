import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { Comunidad_Transformacion_Model } from '../schemas/comun_transf.schema';

export class Delete_Comunidad_Transformacion_Dto  {
    @ApiProperty({  
        example:'66763c9511dbc2cb96b53d4d'})
    @IsMongoId()
    @IsString({ message: 'The Id of the comunidad must be a String' })
    @IsRelationShipWith(Comunidad_Transformacion_Model)
    @IsNotEmpty({ message: 'The Comunidad ID cannot be empty' })  
    id:string
    
    
}
