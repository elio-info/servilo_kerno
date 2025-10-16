import { Injectable } from '@nestjs/common';
import { Create_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto } from '../dto/create-n_catgcont-m_espc.dto';
import { Update_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto } from '../dto/update-n_catgcont-m_espc.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Nomencla_Categorias_ContratacionManifestacion_Especialidad, Nomencla_Categorias_ContratacionManifestacion_Especialidad_Document } from '../schemas/n_catgcont-m_espc.schema';
import { Model, Types } from 'mongoose';
 
@Injectable()
export class Nomencla_Categorias_ContratacionManifestacion_Especialidad_Service {
  
  constructor(
    @InjectModel( Nomencla_Categorias_ContratacionManifestacion_Especialidad.name) private readonly nomencla_categ_ContrataManif_Espec_Model: Model < Nomencla_Categorias_ContratacionManifestacion_Especialidad_Document>,
  ){ }

  async create(create_NomenCategContratManif_Espec_Dto: Create_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto) :Promise <void>{
    console.log('salio esto'+Types.ObjectId.isValid(create_NomenCategContratManif_Espec_Dto.ID_categoria_manifestacion))
    /*
    let nomb=create_NomenCategContratManif_Espec_Dto.nombre_categoria_manifestacion_especialidad
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
   return  
    }  
      */  this.nomencla_categ_ContrataManif_Espec_Model.create(
      create_NomenCategContratManif_Espec_Dto
      );
  }

 async findAll() {
    return await this.nomencla_categ_ContrataManif_Espec_Model.find();
  }

  async findId(id:string) {
    return await this.nomencla_categ_ContrataManif_Espec_Model.findById({_id:id});
  }
  async findFirstName (id_nom_cat_contman_esp: string): Promise <Nomencla_Categorias_ContratacionManifestacion_Especialidad> {
    console.log(id_nom_cat_contman_esp)
    const ll=await this.nomencla_categ_ContrataManif_Espec_Model.findOne({
      nombre_categoria_manifestacion:id_nom_cat_contman_esp
    })
    console.log(ll)
    return ll;
  }

  async update(id: string, update_nccm_espDto: Update_Nomencla_CategoriasContratacionManifestacion_Especialidad_Dto) {
    console.log(update_nccm_espDto)
    const rest= await this.nomencla_categ_ContrataManif_Espec_Model.findByIdAndUpdate(id,update_nccm_espDto, { new: true})
    return rest
  }

  async remove(id: string) {
    return await this.nomencla_categ_ContrataManif_Espec_Model.findOneAndDelete({_id:id});
  }
}
