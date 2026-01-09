import { IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsRelationShipWith } from 'src/modules/common/decorators/validateIdExistence';
import { ProvinceModel } from 'src/modules/province/infrastructure/province.schema';
import { MunicipalityModule } from '../../municipality.module';
import { MunicipalityModel } from '../../infrastructure/municipality.schema';

export class UpdateMunicipalityDto {
    
    // @ApiProperty({ type: 'ObjectId.Municipality',
    // example:`6669ff90079184e73863190a de Pinar del Rio`,
    // required:true
    // })
    @IsMongoId({message:'No es formato valido'})
    @IsString({ message: 'The Id of the municipality must be a String' })
    @IsRelationShipWith(MunicipalityModel)
    @IsNotEmpty({ message: 'The Municipality ID cannot be empty' })
    id: string;

    // @ApiProperty({
    // description:'Nombre del municipio. No debe de repetirse en el Provincia'
    // })
    @IsOptional()
    @MinLength(3)
    @IsString({ message: 'The name of the municipality must be a String' })
    @IsNotEmpty({ message: 'The name of the municipality cannot be empty' })
    name: string;

    // @ApiProperty({ type: 'ObjectId.Province',
    // example:`6669ff90079184e73863190a de Pinar del Rio`
    // })
    @IsMongoId({message:'No es formato valido'})
    @IsString({ message: 'The Id of the province must be a String' })
    @IsRelationShipWith(ProvinceModel)
    @IsOptional()
    @IsNotEmpty({ message: 'The Province ID cannot be empty' })
    province: string;

}
