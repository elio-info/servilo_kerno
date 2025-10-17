import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProgramaSocial_Especial, ProgramaSocial_Especial_Document } from '../schemas/prog_socl_espc.schema';
import { Create_ProgramaSocial_Especial_Dto } from '../dto/create-prog_socl_espc.dto';
import { Update_ProgramaSocial_Especialidad_Dto } from '../dto/update-prog_socl_espc.dto';
 
@Injectable()
export class ProgramaSocial_Especial_Service {
  
  constructor(
    @InjectModel( ProgramaSocial_Especial.name) private readonly ps_Espec_Model: Model < ProgramaSocial_Especial_Document>,
  ){ }
// :Promise <void>
  async create(create_ps_Espec_Dto: Create_ProgramaSocial_Especial_Dto) {
    console.log('salio esto'+Types.ObjectId.isValid(create_ps_Espec_Dto.prog_socl))
    /**/
    let nomb=create_ps_Espec_Dto.nombre_programasocial_especial
    console.log(' estoy en creat '+ nomb)
    let dep= await this.findFirstName(nomb)
    
    if ( dep!=null )
     { console.log(' estoy encontrando '+nomb+' en create '+ dep.createdAt)
      return {
        message:'ya existe '+dep.createdAt
      }}
     else         
   { console.log(' estoy en create '+'no existe '+nomb)
   return this.ps_Espec_Model.create(
      create_ps_Espec_Dto
      );} 
  }

 async findAll() {
    return await this.ps_Espec_Model.find();
  }

  async findId(id:string) {
    return await this.ps_Espec_Model.findById({_id:id});
  }
  async findFirstName (id_nom_ps_esp: string): Promise <ProgramaSocial_Especial> {
    console.log(id_nom_ps_esp)
    const ll=await this.ps_Espec_Model.findOne({
      nombre_programasocial_especial:id_nom_ps_esp
    })
    console.log(ll)
    return ll;
  }

  async update(id: string, update_ps_espDto: Update_ProgramaSocial_Especialidad_Dto) {
    console.log(update_ps_espDto)
    const rest= await this.ps_Espec_Model.findByIdAndUpdate(id,update_ps_espDto, { new: true})
    return rest
  }

  async remove(id: string) {
    return await this.ps_Espec_Model.findOneAndDelete({_id:id});
  }
}
