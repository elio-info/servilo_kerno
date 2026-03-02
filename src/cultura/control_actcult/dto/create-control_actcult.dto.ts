import { ApiProperty } from "@nestjs/swagger"
import { Talento_Artistico_Entity } from "../../talentos/schemas/talentos.entity"
import { IsRelationShipWith } from "src/modules/common/decorators/validateIdExistence"
import { EntityModel } from "src/modules/entity/infrastructure/entity.schema"
import { IsArray, IsMongoId, IsNotEmpty } from "class-validator"
import { ProgramaSocial_Model } from "src/cultura/programas/schemas/prog_socl.schema"
import { Talento_Artistico_Contratado_Entity } from "src/cultura/talentos/talento_contratado/talento_contratado.entity"

export class Create_CActCult_Dto {
    @ApiProperty({
        example:'Dia de los bebes',
        required:true,
        minLength:3,
        type:String
    })
    name:string

    @ApiProperty({
        example:'29-06-2024',
        maxLength:10,
        minLength:10,
        required:true
    })
    dia_actcult:string

    @ApiProperty({
        example:'20:06',
        maxLength:5,
        minLength:5,
        nullable:true
    })
    hora_actcult:string  //Timestamp

    @ApiProperty({required:true})
    @IsRelationShipWith(EntityModel)
    @IsNotEmpty()
    @IsMongoId()
    entidad_responsable:string

    @ApiProperty({required:true})
    // @IsRelationShipWith(ProgramaSocial_Model)
    @IsNotEmpty()
    // @IsMongoId()
    @IsArray()
    programas:string[]

    @ApiProperty({example:` '[Talento_Artistico]'
        [
    Talento_Artistico_Contratado_Entity {
    id:string
    name :string
    manifest:string
    numero_contrato:string
    numero_prefactura:string
    cantidad:number
    }   
    ]` })
    talentos:Talento_Artistico_Contratado_Entity[]

    @ApiProperty({example:` '[Talento_Artistico]'
        [
    Talento_Artistico_Contratado_Entity {
    id:string
    name :string
    manifest:string
    numero_contrato:string
    numero_prefactura:string
    cantidad:number
    }   
    ]` })
    apoyos?:Talento_Artistico_Contratado_Entity[]

}
