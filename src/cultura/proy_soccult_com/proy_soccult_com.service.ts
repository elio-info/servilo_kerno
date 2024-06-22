import { Injectable } from '@nestjs/common';
import { Create_Proyecto_Sociocultural_Comunitario_Dto } from './dto/create-proy_soccult_com.dto';
import { UpdateProySoccultComDto } from './dto/update-proy_soccult_com.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Proyecto_Sociocultural_Comunitario_Document, Proyecto_Sociocultural_Comunitario_Model } from './schemas/proy_soccult_com.schema';
import { Model } from 'mongoose';

@Injectable()
export class Proyecto_Sociocultural_Comunitario_Service {
  constructor(
    @InjectModel(Proyecto_Sociocultural_Comunitario_Model.name) private readonly pscc_Model:Model<Proyecto_Sociocultural_Comunitario_Document>
  ){}

  async create(createProySoccultComDto: Create_Proyecto_Sociocultural_Comunitario_Dto):Promise<void> {
    this.pscc_Model.create(createProySoccultComDto)
  }

  findAll():Promise<Proyecto_Sociocultural_Comunitario_Document[]> {
    return this.pscc_Model.find()
  }

  async findOne(id: string) :Promise<Proyecto_Sociocultural_Comunitario_Document[]>{
    return await this.pscc_Model.find({_id:id});
  }

  update(id: number, updateProySoccultComDto: UpdateProySoccultComDto) {
    return `This action updates a #${id} proySoccultCom`;
  }

  remove(id: number) {
    return `This action removes a #${id} proySoccultCom`;
  }
}
