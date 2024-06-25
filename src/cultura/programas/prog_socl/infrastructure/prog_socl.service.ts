import { Injectable } from '@nestjs/common';
import { Create_ProgramaSocial_Dto } from '../dto/create-prog_socl.dto';
import { Update_ProgramaSocial_Dto } from '../dto/update-prog_socl.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ProgramaSocial, ProgramaSocial_Document } from '../schemas/prog_socl.schema';
import { Model } from 'mongoose';
 
@Injectable()
export class ProgramaSocial_Service {
  
  constructor(
    @InjectModel( ProgramaSocial.name) private readonly progsocl_Model: Model < ProgramaSocial_Document>,
  ){ }

  async create(createProgramaSocialDto: Create_ProgramaSocial_Dto) {
    let nomb=createProgramaSocialDto.nombre_programasocial
    console.log(' estoy en creat '+ nomb)
    let dep= await this.findFirstName(nomb)
    console.log(' estoy encontrando '+nomb+' en create '+ dep)
    if ( dep!=null
    )
     { return {
        message:' estoy en create '+'ya existe '+dep.createdAt
      }}
     else         
   { console.log(' estoy en create '+'no existe '+nomb)
   return  this.progsocl_Model.create(
      createProgramaSocialDto
      );
    }    
  }

 async findAll() {
    return await this.progsocl_Model.find();
  }

  async findId(id:string) {
    return await this.progsocl_Model.findById({_id:id});
  }
  async findFirstName (id_nom_cat_contman: string): Promise <ProgramaSocial> {
    console.log(id_nom_cat_contman)
    const ll=await this.progsocl_Model.findOne({
      nombre_programasocial:id_nom_cat_contman
    })
    console.log(ll)
    return ll;
  }

  async update(id: string, updateDto: Update_ProgramaSocial_Dto) {
    console.log(updateDto)
    const rest= await this.progsocl_Model.findByIdAndUpdate(id,updateDto, { new: true})
    return rest
  }

  async remove(id: string) {
    return await this.progsocl_Model.findOneAndDelete({_id:id});
  }
}
