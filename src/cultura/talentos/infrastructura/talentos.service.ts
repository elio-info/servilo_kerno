import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Talento_Artistico_Document, Talento_Artistico_Model } from '../schemas/talentos.schema';
import { Model, Query } from 'mongoose';
import { Create_Talento_Artistico_Dto } from '../dto/create-talentos.dto';
import { Update_Talento_Artistico_Dto } from '../dto/update-talentos.dto';

@Injectable()
export class Talento_Artistico_Service {
    constructor (
        @InjectModel(Talento_Artistico_Model.name) private readonly talento_Model: Model< Talento_Artistico_Document>
    ){}

    async create(create_talento:Create_Talento_Artistico_Dto): Promise<void>{
        this.talento_Model.create(create_talento )
    }

    async findAll():Promise< Talento_Artistico_Document[]> {
        return await this.talento_Model
        .find()
        .populate('manifest_esp')
        .populate('entidad_talento');
      }
    async findByName(buscarNombre?:string): Promise< Talento_Artistico_Document[]> {
        let buscar={ "nombre_Talento_Artistico": { $regex: `${buscarNombre}` ,$options:"i"} }
        console.log(buscar)
        return await this.talento_Model.find(buscar)
      }
    
      async findId(id:string) {
        return await this.talento_Model.findById({_id:id});
      }

      async update(id: string, update_talento_Dto: Update_Talento_Artistico_Dto) {
        console.log(update_talento_Dto)
        const rest= await this.talento_Model.findByIdAndUpdate(id,update_talento_Dto, { new: true})
        return rest
      }
    
      async remove(id: string) {
        return await this.talento_Model.findByIdAndDelete({_id:id});
      }
}
