import { Injectable } from '@nestjs/common';
import { Update_Comunidad_Transformacion_Dto } from './dto/update-comun_transf.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Comunidad_Transformacion_Document, Comunidad_Transformacion_Model } from './schemas/comun_transf.schema';
import { Connection, Model } from 'mongoose';
import { Create_Comunidad_Transformacion_Dto } from './dto/create-comun_transf.dto';
import { IsRelationshipProvider } from 'src/modules/common/helpers/customIdValidation';
import { TrazasService } from '../trazas/trazas.service';
import { Comunidad_Transformacion_Entity } from './schemas/comun_transf.entity';
import { SearchDuplicate_KeysValue } from 'src/modules/common/errors/duplicated-value.error';
import { DataList } from 'src/modules/common/data-list';
import { Search_Comunidad_Transformacion_Dto } from './dto/search-comun_transf.dto';
import { ErrorX, ObjectCanNotDeleted } from 'src/modules/common/errors/object-not-found.error';

@Injectable()
export class Comunidad_Transformacion_Service {
  private MODULE = 'Comunidad Transformacion';
  private IS_NOT_DELETED = { isDeleted: false };
  private cstvldt: IsRelationshipProvider 

  constructor(
    @InjectModel(Comunidad_Transformacion_Model.name) private readonly comtransf_Model:Model<Comunidad_Transformacion_Model>,
    @InjectConnection() private cnn:Connection
  ) {this.cstvldt= new IsRelationshipProvider(this.cnn)}

  async create(createComTransDto: Create_Comunidad_Transformacion_Dto,traza:TrazasService):Promise<Comunidad_Transformacion_Entity | string> {
    let srch= await SearchDuplicate_KeysValue(this.MODULE,this.comtransf_Model,['name','consejopopular_municipality'],[createComTransDto.name,createComTransDto.consejopopular_municipality], traza)
    if (srch.trazaDTO.error!='Ok'){
      srch.save()
      return srch.terror();
    }
    try {
      let sv=await this.comtransf_Model.create(createComTransDto);
      console.log(sv, sv._id.toString());
      
      let ent=this.findOne(sv._id.toString());
      traza.trazaDTO.update=ent;
      traza.save();
      return ent;
    } catch (error) {
      traza.trazaDTO.error=error;
      traza.save()
      return error.toString();
    }
    
  }

  async findAll(page: number, pageSize: number):Promise<DataList <Comunidad_Transformacion_Entity>| string> {
    let skipCount=(page -1 ) * pageSize;
    try {
      let fnd= await this.comtransf_Model.find(this.IS_NOT_DELETED).populate('consejopopular_municipality').skip(skipCount).limit(pageSize).exec()

    let ct_cll=fnd.map( (itm)=> this.toEntity(itm)    );

    return {
      data:ct_cll,
      totalPages:Math.ceil(ct_cll.length/pageSize),
      currentPage:page
    }
    } catch (error) {
      return error.toString()
    }    
  }

  async findOne(id: string) :Promise<Comunidad_Transformacion_Entity | string>{
    try {
      let fn= await this.comtransf_Model.findById(id).populate('consejopopular_municipality');
       return this.toEntity(fn);
    } catch (error) {
      return error.toString()
    }
   ;
  }

  async update( updateComTransfDto: Update_Comunidad_Transformacion_Dto,traza:TrazasService):Promise<Comunidad_Transformacion_Entity| string> {
    console.log(updateComTransfDto)

    traza.trazaDTO.before=await this.findOne(updateComTransfDto.id)
    try {
      let up= await this.comtransf_Model.findByIdAndUpdate(updateComTransfDto.id,updateComTransfDto,{new :true });
      traza.trazaDTO.update=up;
      traza.save();
      return this.findOne(up.id);
    } catch (error) {
      traza.trazaDTO.error=error;
      traza.trazaDTO.update='';
      traza.save();
      return traza.terror();
    }
     
  }

  async remove(id: string,traza:TrazasService):Promise<Comunidad_Transformacion_Entity| string>  {
    
    // hjos
    let hijos = await this.cstvldt.validate_onTable('control_actividadcultural',{ct_planificado:id},this.IS_NOT_DELETED)
    if (hijos!=0) {
        let error=new ObjectCanNotDeleted (this.MODULE,hijos );
        traza.trazaDTO.error= error ;
        traza.save();
        throw traza.terror();
      }

      let bf=this.findOne(id);
      traza.trazaDTO.before=bf;      
      const document = await this.comtransf_Model.findOneAndUpdate(
        { _id: id, isDeleted: false },
        {
          isDeleted: true,
        },
      );
  
      if (!document) {
         let err=new Error('Problema con eliminacion  '+  id)
          traza.trazaDTO.error=err.name+' => '+err.message;
          traza.trazaDTO.update='';
          traza.save()
          throw err;
      }
      traza.trazaDTO.update=document;    
      traza.trazaDTO.error='Ok';
      traza.save()      

    return await this.findOne(id)
  }

  async search(query:Search_Comunidad_Transformacion_Dto) :  Promise<Comunidad_Transformacion_Entity[]|string>{
      const ents = await this.comtransf_Model
        .find(query)
        // .populate(this.POPULATE_PATH.municipality)
        // .populate(this.POPULATE_PATH.entityType)
        // //.populate('parentId')
        .populate("consejopopular_municipality");
      const entCollection = ents.map((ent) => this.toEntity(ent));
      return entCollection;
    }

  toEntity(ct:Comunidad_Transformacion_Model): Comunidad_Transformacion_Entity {
       return {
        id:ct._id.toString(),
        name:ct.name,
        consejopopular_municipality:ct.consejopopular_municipality,//._id.toString(),
        //municipio:ct.m
        observacion:ct.observacion,
        responsable:ct.responsable,
        telefonos:ct.telefonos,
        isDeleted:ct.isDeleted,
        createdAt: ct.createdAt,
        updatedAt: ct.updatedAt
       } 
    }
}
