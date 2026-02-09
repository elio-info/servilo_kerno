import { Injectable } from '@nestjs/common';
import { Create_ProgramaSocial_Dto } from '../dto/create-progsocl.dto';
import { Update_ProgramaSocial_Dto } from '../dto/update-progsocl.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ProgramaSocial_Model, ProgramaSocial_Document } from '../schemas/prog_socl.schema';
import { Connection, Model } from 'mongoose';
import { IsRelationshipProvider } from 'src/modules/common/helpers/customIdValidation';
 
@Injectable()
export class ProgramaSocial_Service {
  private MODULE = 'ProgramaSocial';
  private IS_NOT_DELETED = { isDeleted: false };
  private cstvldt: IsRelationshipProvider   
  
  constructor(
    @InjectModel( ProgramaSocial_Model.name) private readonly progsocl_Model: Model < ProgramaSocial_Document>,
 @InjectConnection() private cnn: Connection,
  ) { this.cstvldt= new IsRelationshipProvider(this.cnn)}


  async create(ps: Create_ProgramaSocial_Dto) {
    let nomb=ps.name
    console.log(' estoy en creat '+ nomb);
    let dep=await this.findFirstName(nomb);
    
    if ( dep!=null
    )
     { console.log(' estoy encontrando '+nomb+' en create '+ dep.createdAt);
      return {
        message:'Ya existe '+dep.createdAt
      }}
     else         
   { console.log(' estoy en create '+'no existe '+nomb)
   return  this.progsocl_Model.create(
      ps
      );
    }    
  }

 async findAll() {
    return await this.progsocl_Model.find();
  }

  async findId(id:string) {
    return await this.progsocl_Model.findById({_id:id});
  }
  // :Promise <ProgramaSocial_Document>
  async findFirstName(nombre_programasocial: string): Promise<ProgramaSocial_Model>  {
    console.log(nombre_programasocial);    
    return await this.progsocl_Model.findOne({name: nombre_programasocial});
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
