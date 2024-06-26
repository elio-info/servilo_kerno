import { Injectable } from '@nestjs/common';
import { Create_Control_ActividadCultural_Dto } from '../dto/create-control_actcult.dto';
import { Update_Control_ActividadCultural_Dto } from '../dto/update-control_actcult.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Control_ActividadCultural_Document, Control_ActividadCultural_Model } from '../schemas/control_actcult.schema';
import { Model } from 'mongoose';

@Injectable()
export class Control_ActividadCultural_Service {

  constructor(@InjectModel(Control_ActividadCultural_Model.name) private readonly cntrl_actvcultMdl:Model<Control_ActividadCultural_Document>){}

  async create(createControlActcultDto: Create_Control_ActividadCultural_Dto):Promise<void> {
     this.cntrl_actvcultMdl.create(createControlActcultDto)
  }

  findAll():Promise<Control_ActividadCultural_Document[]> {
    return this.cntrl_actvcultMdl.find()
  }

  async findOne(id: string):Promise<Control_ActividadCultural_Document> {
    return await this.cntrl_actvcultMdl.findOne({_id:id})
  }

  async findByName(name: string):Promise<Control_ActividadCultural_Document> {
    return await this.cntrl_actvcultMdl.findOne({nombre_actcult:name})
  }
  async update(id: string, updateControlActcultDto: Update_Control_ActividadCultural_Dto):Promise<Control_ActividadCultural_Document> {
    return await this.cntrl_actvcultMdl.findByIdAndUpdate(id,updateControlActcultDto,{new:true})
  }

 async remove(id: string) {
    return await this.cntrl_actvcultMdl.findByIdAndDelete({id})
  }
}
