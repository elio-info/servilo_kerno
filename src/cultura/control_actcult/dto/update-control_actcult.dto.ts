import { PartialType } from '@nestjs/swagger';
import { Create_Control_ActividadCultural_Dto } from './create-control_actcult.dto';

export class Update_Control_ActividadCultural_Dto extends PartialType(Create_Control_ActividadCultural_Dto) {}
