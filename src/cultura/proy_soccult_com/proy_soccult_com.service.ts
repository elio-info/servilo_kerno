import { Injectable } from '@nestjs/common';
import { CreateProySoccultComDto } from './dto/create-proy_soccult_com.dto';
import { UpdateProySoccultComDto } from './dto/update-proy_soccult_com.dto';

@Injectable()
export class Proyecto_Sociocultural_Comunitario_Service {
  create(createProySoccultComDto: CreateProySoccultComDto) {
    return 'This action adds a new proySoccultCom';
  }

  findAll() {
    return `This action returns all proySoccultCom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proySoccultCom`;
  }

  update(id: number, updateProySoccultComDto: UpdateProySoccultComDto) {
    return `This action updates a #${id} proySoccultCom`;
  }

  remove(id: number) {
    return `This action removes a #${id} proySoccultCom`;
  }
}
