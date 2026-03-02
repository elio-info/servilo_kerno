import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Talento_Artistico_Document, Talento_Artistico_Model } from '../schemas/talentos.schema';
import { Connection, Model, Query } from 'mongoose';
import { Create_Talento_Artistico_Dto } from '../dto/create-talentos.dto';
import { Update_Talento_Artistico_Dto } from '../dto/update-talentos.dto';
import { IsRelationshipProvider } from 'src/modules/common/helpers/customIdValidation';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { Talento_Artistico_Entity } from '../schemas/talentos.entity';
import { SearchDuplicate_KeysValue } from 'src/modules/common/errors/duplicated-value.error';
import { Search_Talentos_Artisticos_Dto } from '../dto/search-talentos.dto';
import { ObjectCanNotDeleted } from 'src/modules/common/errors/object-not-found.error';

@Injectable()
export class Talento_Artistico_Service {
  private MODULE = 'Talentos y Apoyos';
  private IS_NOT_DELETED = { isDeleted: false };
  private cstvldt: IsRelationshipProvider 
  
    constructor (
        @InjectModel(Talento_Artistico_Model.name) private readonly talento_Model: Model< Talento_Artistico_Document>,
        @InjectConnection() private cnn:Connection
    ){ this.cstvldt=new IsRelationshipProvider(cnn);}

    async create(create_talento:Create_Talento_Artistico_Dto, traza:TrazasService): Promise<Talento_Artistico_Entity | string>{
      let dup= await SearchDuplicate_KeysValue(this.MODULE,this.talento_Model,['name','manifest'],[create_talento.name,create_talento.manifest],traza)  
      
      if (dup.trazaDTO.error!='Ok') {
        dup.save();
        return dup.trazaDTO.error.toString();
      }
      try {
        let crt= await this.talento_Model.create(create_talento );
        let tt=this.toEntity(crt);
        traza.trazaDTO.update= tt;
        traza.save();
        return tt;
      } catch (error) {
        traza.trazaDTO.error=error;
        traza.save()
        return traza.trazaDTO.error.toString();
      }
      
    }

    async findAll(page: number, pageSize: number):Promise< Talento_Artistico_Document[] |string> {
        return await this.talento_Model.find(this.IS_NOT_DELETED);
      }
    async search(srch:Search_Talentos_Artisticos_Dto): Promise< Talento_Artistico_Document[]> {
        let buscar={ "name": { $regex: `${srch.name}` ,$options:"i"} }
        console.log(buscar)
        return await this.talento_Model.find(buscar)
      }
    
      async findId(id:string) {
        return await this.talento_Model.findById({_id:id});
      }

      async update( update_talento_Dto: Update_Talento_Artistico_Dto,traza:TrazasService) {
        traza.trazaDTO.before=this.findId(update_talento_Dto.id);
        console.log(update_talento_Dto);
        try {
           const rest= await this.talento_Model.findByIdAndUpdate(update_talento_Dto.id,update_talento_Dto, { new: true})
           let tt=this.toEntity(rest);
           traza.trazaDTO.update=tt;
          traza.save();
           return  tt
        } catch (error) {
          traza.trazaDTO.error=error;
          traza.save()
          return traza.trazaDTO.error.toString();
        }
       
      }
    
  async remove(id: string,traza:TrazasService) {

    let hijos=await this.cstvldt.validate_onTable('control_actividadcultural',{'talentos':id,'apoyos':id},this.IS_NOT_DELETED);
    console.log('hijos t y a ',hijos);
    if (hijos!=0) { //tienes hijos no te borras  
      let error=new ObjectCanNotDeleted (this.MODULE,hijos );
      traza.trazaDTO.error= error ;
      traza.save();
      return error.toString();
    }
    traza.trazaDTO.before= await this.findId(id);
    try {
      const document = await this.talento_Model.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        isDeleted: true,
      },
    );
    traza.trazaDTO.filter={id:id} ;
    traza.trazaDTO.update=this.toEntity(document) ;
      traza.save();
    } catch (error) {
       traza.trazaDTO.error= error ;
      traza.save();
      return error;
    }
    
}

      toEntity(tl:Talento_Artistico_Model):Talento_Artistico_Entity{
        return {
          id:tl._id.toString(),
          name:tl.name,    
          manifest:tl.manifest,//._id.toString(),
          entidad_talento:tl.entidad_talento,//._id.toString(),     
          persona_TalentoArtistico:tl.persona_TalentoArtistico,
          contrato_talento: tl.contrato_talento,
          isDeleted:tl.isDeleted,
          createdAt: tl.createdAt,  
          updatedAt: tl.updatedAt
        }
      }
}
