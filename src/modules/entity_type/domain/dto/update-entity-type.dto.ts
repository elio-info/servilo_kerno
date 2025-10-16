import { PartialType } from '@nestjs/mapped-types';
import { CreateEntityTypeDto } from './create-entity-type.dto';

export class UpdateEntityTypeDto extends PartialType(CreateEntityTypeDto) {}
