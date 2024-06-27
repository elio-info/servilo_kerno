import { Talento_Artistico_Contratado_Entity } from "../../talentos/talento_contratado/talento_contratado.entity"

export class Control_ActividadCultural_Entity {
    id:string
    nombre_actcult:string
    dia_actcult:string// Date
    hora_actcult:string  // DateTimestamp
    talentos_y_apoyos:Talento_Artistico_Contratado_Entity[]//talentos contratados
}
