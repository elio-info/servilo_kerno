import { Injectable } from '@nestjs/common';
import { Create_Nomencla_CategoriasContratacionManifestacion_Dto } from '../dto/create-n_catgcont-m.dto';
import { Update_Nomencla_CategoriasContratacionManifestacion_Dto } from '../dto/update-n_catgcont-m.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Nomencla_Categorias_ContratacionManifestacion, Nomencla_Categorias_ContratacionManifestacion_Document } from '../schemas/n_catgcont-m.schema';
import { Model } from 'mongoose';
 
@Injectable()
export class Nomencla_Categorias_ContratacionManifestacion_Service {
  
  constructor(
    @InjectModel( Nomencla_Categorias_ContratacionManifestacion.name) private readonly nomencla_categ_ContrataManif_Model: Model < Nomencla_Categorias_ContratacionManifestacion_Document>,
  ){ }

  async create(createNomenclaCategoriasContratacionManifestacionDto: Create_Nomencla_CategoriasContratacionManifestacion_Dto) {
    let nomb=createNomenclaCategoriasContratacionManifestacionDto.nombre_categoria_manifestacion
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
   return  this.nomencla_categ_ContrataManif_Model.create(
      createNomenclaCategoriasContratacionManifestacionDto
      );
    }    
  }

 async findAll() {
    return await this.nomencla_categ_ContrataManif_Model.find();
  }

  async findId(id:string) {
    return await this.nomencla_categ_ContrataManif_Model.findById({_id:id});
  }
  async findFirstName (id_nom_cat_contman: string): Promise <Nomencla_Categorias_ContratacionManifestacion> {
    console.log(id_nom_cat_contman)
    const ll=await this.nomencla_categ_ContrataManif_Model.findOne({
      nombre_categoria_manifestacion:id_nom_cat_contman
    })
    console.log(ll)
    return ll;
  }

  async update(id: string, updateNomenclaCategoriasContratacionManifestacionDto: Update_Nomencla_CategoriasContratacionManifestacion_Dto) {
    console.log(updateNomenclaCategoriasContratacionManifestacionDto)
    const rest= await this.nomencla_categ_ContrataManif_Model.findByIdAndUpdate(id,updateNomenclaCategoriasContratacionManifestacionDto, { new: true})
    return rest
  }

  async remove(id: string) {
    return await this.nomencla_categ_ContrataManif_Model.findOneAndDelete({_id:id});
  }
}
