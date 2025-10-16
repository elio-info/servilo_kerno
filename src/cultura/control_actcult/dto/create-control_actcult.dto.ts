import { ApiProperty } from "@nestjs/swagger"
import { Talento_Artistico_Entity } from "../../talentos/schemas/talentos.entity"

export class Create_Control_ActividadCultural_Dto {
    @ApiProperty({
        example:'Dia de los bebes',
        required:true,
        minLength:3,
        type:String
    })
    nombre_actcult:string

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

    @ApiProperty({example:` '[Talento_Artistico]'
        [{
    "_id": "6674bba60c094c02c3a5bef1",
    "nombre_Talento_Artistico": "Pedro Prieto",
    "manifest_esp": "666b7d6e80597b171ef1495d",
    "persona_TalentoArtistico": true,
    "contrato_talento": "A",
    "entidad_talento": "666c39bd57d4be9254cb5741"    
    }]` })
    talentos_y_apoyos?:Talento_Artistico_Entity[]

    
}
