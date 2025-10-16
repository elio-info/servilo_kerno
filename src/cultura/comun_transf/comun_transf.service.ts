import { Injectable } from '@nestjs/common';
import { Update_Comunidad_Transformacion_Dto } from './dto/update_comun_transf.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comunidad_Transformacion_Document, Comunidad_Transformacion_Model } from './schemas/comun_transf.schema';
import { Model } from 'mongoose';
import { Create_Comunidad_Transformacion_Dto } from './dto/create-comun_transf.dto';

@Injectable()
export class Comunidad_Transformacion_Service {
  constructor(
    @InjectModel(Comunidad_Transformacion_Model.name) private readonly comtransf_Model:Model<Comunidad_Transformacion_Document>
  ){}

  async create(createComTransDto: Create_Comunidad_Transformacion_Dto):Promise<void> {
    this.comtransf_Model.create(createComTransDto)
  }

  findAll():Promise<Comunidad_Transformacion_Document[]> {
    return this.comtransf_Model.find()
  }

  async findOne(id: string) :Promise<Comunidad_Transformacion_Document[]>{
    return await this.comtransf_Model.find({_id:id});
  }

  update(id: string, updateComTransfDto: Update_Comunidad_Transformacion_Dto):Promise<Comunidad_Transformacion_Document> {
    console.log(updateComTransfDto)
    return this.comtransf_Model.findByIdAndUpdate(id,updateComTransfDto,{new :true })
  }

  async remove(id: string):Promise<void> {
    return await this.comtransf_Model.findByIdAndDelete(id)
  }
}
