import { Timestamp } from "rxjs"
import { Talento_Artistico } from "src/cultura/talentos/schemas/talentos.entity"

export class Control_ActividadCultural_Entity {
    id:string
    nombre_actcult:string
    dia_actcult:string// Date
    hora_actcult:string  // DateTimestamp
    talentos_y_apoyos:Talento_Artistico[]
}
