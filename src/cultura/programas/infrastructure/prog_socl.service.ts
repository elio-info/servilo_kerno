import { Injectable } from '@nestjs/common';
import { Create_ProgramaSocial_Dto } from '../dto/create-progsocl.dto';
import { Update_ProgramaSocial_Dto } from '../dto/update-progsocl.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ProgramaSocial_Model, ProgramaSocial_Document } from '../schemas/prog_socl.schema';
import { Connection, Model } from 'mongoose';
import { IsRelationshipProvider } from 'src/modules/common/helpers/customIdValidation';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { SearchDuplicate_NameValue } from 'src/modules/common/errors/duplicated-value.error';
import { ProgramaSocial_Entity } from '../schemas/prog_socl.entity';
import { Search_ProgramaSocial_Dto } from '../dto/search-prog_socl.dto';
import { DataList } from 'src/modules/common/data-list';
import { ObjectCanNotDeleted } from 'src/modules/common/errors/object-not-found.error';
 
@Injectable()
export class ProgramaSocial_Service {
  private MODULE = 'ProgramaSocial';
  private IS_NOT_DELETED = { isDeleted: false };
  private cstvldt: IsRelationshipProvider;   
  
  constructor(
    @InjectModel( ProgramaSocial_Model.name) private readonly progsocl_Model: Model < ProgramaSocial_Document>,
 @InjectConnection() private cnn: Connection,
  ) { this.cstvldt= new IsRelationshipProvider(this.cnn)}


  async create(ps: Create_ProgramaSocial_Dto, traza :TrazasService) : Promise<ProgramaSocial_Entity | string> {
    let nomb=ps.name
    console.log(this.MODULE+ ' estoy en creat '+ nomb);
    let dep=await SearchDuplicate_NameValue(this.MODULE, this.progsocl_Model,['name'],[ nomb],traza);
    
    if ( dep.trazaDTO.error!='Ok'  ) {
      dep.save();
      return dep.trazaDTO.error.toString()  ; 
    }
    
    try {
      let c_ps=await new this.progsocl_Model(ps).save()
      let crt = this.toEntity( c_ps );
      traza.trazaDTO.update=crt;
       traza.save();
      return crt;
    } catch (error) {
      traza.trazaDTO.error= error ;
      traza.save();
      return error.toString();
    }
    
  }

 async findAll(page: number, pageSize: number): Promise<DataList<ProgramaSocial_Entity> | string> {
  let skipCount=(page -1 ) * pageSize;

    let fnd= await this.progsocl_Model.find(this.IS_NOT_DELETED).skip(skipCount).lean().exec();
    let pss=fnd.map((itm)=> this.toEntity(itm));
     const dataList: DataList<ProgramaSocial_Entity> = {
          data: pss,
          totalPages: Math.ceil(pss.length / pageSize),
          currentPage: page,
        };
        return dataList;
  }

  async findId(id:string): Promise<ProgramaSocial_Entity | string>{
    try {
      let ps=await this.progsocl_Model.findById({_id:id,...this.IS_NOT_DELETED});
      return this.toEntity(ps);
    } catch (error) {
      return error.toString()
    }     
  }
  // :Promise <ProgramaSocial_Document>


  async update( updateDto: Update_ProgramaSocial_Dto, traza:TrazasService): Promise<ProgramaSocial_Entity | string>  {
    console.log(updateDto)
    try {
      let antes=await this.findId( updateDto.id);
       let rest= await this.progsocl_Model.findOneAndUpdate( {_id:updateDto.id,...this.IS_NOT_DELETED},updateDto, { new: true});
       
       if (!rest) {
        let err=new Error('Problema con actualizacion de '+this.MODULE)
        traza.trazaDTO.error=err;
        traza.trazaDTO.update='';
        traza.save()
        return err.toString();
        }
        traza.trazaDTO.before=antes;
        traza.trazaDTO.update=rest;    
        traza.save()       
        return this.toEntity(rest)
    } catch (error) {
      let err=new Error('Problema con actualizacion Sistema '+this.MODULE)
        traza.trazaDTO.error=error;
        traza.trazaDTO.update='';
        traza.save()
        return error.toString();
    }
   
  }

  async remove(id: string, traza:TrazasService): Promise<ProgramaSocial_Entity | string>  {

    // get all progsocl
    const result_ps = await this.cnn.db.collection('programasocial')
        .findOne({...this.IS_NOT_DELETED, $elemMatch:{programa:id}})
    console.log('progscl, con prog socl padre',result_ps);
    // get all ctrl_cult
    const result = await this.cnn.db.collection('control_actividadcultural')
        .findOne({...this.IS_NOT_DELETED, $elemMatch:{programas:id}})
    console.log('act cult, con prog socl',result);
    
    if (!!result_ps._id || !!result._id) {
      let err=new ObjectCanNotDeleted(this.MODULE,1)
    traza.trazaDTO.error=err;
    traza.trazaDTO.update='';
    traza.save()
    return err.toString();
    }
    
    let dlt= await this.progsocl_Model.findByIdAndUpdate(id,{isDeleted:true})
    traza.trazaDTO.update=dlt;
    traza.save()
    return this.toEntity(dlt); //await this.progsocl_Model.findOneAndDelete({_id:id});
  }

  async search(query:Search_ProgramaSocial_Dto) : Promise<ProgramaSocial_Entity[] | string> {
  
      let buscar=[];
      buscar['isDeleted']= query.isDeleted;
      if (!!query.name) {//existe nombre
        if (!!query.exactName) { buscar[' name']=query.name ; }
        else
        {buscar ['name']= { $regex:query.name , $options:'i'};}
      } 
      if (!!query.priorizado) {//existe tipo
        buscar['priorizado']=query.priorizado ; }

      if (!!query.programa) {//existe progrsoc padre
        buscar['programa']= {$elemMatch:{programas:query.programa }} ;
      }
      console.log(buscar);
      
       let result=[];
      const psCollection =await this.progsocl_Model.find(buscar).exec();
      //console.log(provinceCollection);
      
       psCollection.map((item) =>
        result.push(this.toEntity(item))//
      );
      return result;
    }
  
    toEntity(ps:ProgramaSocial_Model): ProgramaSocial_Entity {
      
      return {
        id:ps._id.toString(),
        name:ps.name,
        priorizado:ps.priorizado,
        programa:ps.programa,
        isDeleted:ps.isDeleted,
        createdAt:ps.createdAt,
        updatedAt:ps.updatedAt
      } ;
    }

}
