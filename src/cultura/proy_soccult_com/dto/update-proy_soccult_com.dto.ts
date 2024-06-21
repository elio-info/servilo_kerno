import { PartialType } from '@nestjs/mapped-types';
import { CreateProySoccultComDto } from './create-proy_soccult_com.dto';

export class UpdateProySoccultComDto extends PartialType(CreateProySoccultComDto) {}
