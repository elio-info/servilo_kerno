import { Injectable } from '@nestjs/common';
import { Create_CActCult_Dto } from '../dto/create-control_actcult.dto';
import { Update_CActCult_Dto } from '../dto/update-control_actcult.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Control_ActividadCultural_Document, Control_ActividadCultural_Model } from '../schemas/control_actcult.schema';
import { Connection, Model } from 'mongoose';
import { IsRelationshipProvider } from 'src/modules/common/helpers/customIdValidation';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { Control_ActividadCultural_Entity } from '../schemas/control_actcult.entity';
import { Search_CActCult_Dto } from '../dto/search-control_actcult.dto';
import { IsAtLeastOnePlace2Insert, SearchDuplicate_KeysValue } from 'src/modules/common/errors/duplicated-value.error';
import { DataList } from 'src/modules/common/data-list';
import { ErrorModule } from 'src/modules/common/errors/error.module';
import { ErrorX } from 'src/modules/common/errors/object-not-found.error';

@Injectable()
export class Control_ActividadCultural_Service {
  private MODULE = 'Control_ActividadCultural';
  private IS_NOT_DELETED = { isDeleted: false };
  private cstvldt: IsRelationshipProvider 
  

  constructor(@InjectModel(Control_ActividadCultural_Model.name) private readonly cntrl_actvcultMdl:Model<Control_ActividadCultural_Document>,
    @InjectConnection() private cnn:Connection
  ) {this.cstvldt= new IsRelationshipProvider(this.cnn)}

  async create(crtAC: Create_CActCult_Dto, traza:TrazasService):Promise<Control_ActividadCultural_Entity | string> {
    
    let valPLaces=await IsAtLeastOnePlace2Insert(crtAC)
    if (!valPLaces) {      
      traza.trazaDTO.error=new ErrorX(this.MODULE,'no existe lugar ');
      traza.save()
      return traza.terror();
    }
    //return "Hasta aqui La perra sata";
    let srch=await SearchDuplicate_KeysValue(this.MODULE,this.cntrl_actvcultMdl,['name','dia_actcult'],[crtAC.name,crtAC.dia_actcult],traza);
    if (srch.trazaDTO.error!='Ok'){
      srch.save()
      return srch.trazaDTO.error.toString();
    }
    try {
      let crt=this.toEntity (await this.cntrl_actvcultMdl.create(crtAC));
      traza.trazaDTO.update=crt;
      traza.save();
      return crt;
    } catch (error) {
      traza.trazaDTO.error=error;
      traza.save()
      return error.toString();
    } 
  }

  async findAll(page: number, pageSize: number): Promise<DataList<Control_ActividadCultural_Entity> | string> {
    let skipCount=(page -1 ) * pageSize;
  
      let fnd= await this.cntrl_actvcultMdl.find(this.IS_NOT_DELETED).skip(skipCount).limit(pageSize).exec();
      let pss=fnd.map((itm)=> this.toEntity(itm));
       const dataList: DataList<Control_ActividadCultural_Entity> = {
            data: pss,
            totalPages: Math.ceil(pss.length / pageSize),
            currentPage: page,
          };
          return dataList;
  }

  async findOne(id: string):Promise<Control_ActividadCultural_Entity | string> {
    return this.toEntity(await this.cntrl_actvcultMdl.findById({_id:id}))
  }

  async search(query:Search_CActCult_Dto):Promise<Control_ActividadCultural_Entity|string> {
    return await this.cntrl_actvcultMdl.findOne({name:name})
  }
  async update( updateControlActcultDto: Update_CActCult_Dto, traza: TrazasService):Promise<Control_ActividadCultural_Entity| string> {
    try {
      let upd= this.toEntity(await this.cntrl_actvcultMdl.findByIdAndUpdate(updateControlActcultDto,{new:true}) )
      traza.trazaDTO.update=upd
      return upd;
    } catch (error) {
      let err=new Error('Problema con actualizacion Sistema '+this.MODULE)
        traza.trazaDTO.error=err;
        traza.trazaDTO.update='';
        traza.save()
        return err.toString();
    }
  }

 async remove(id: string, traza:TrazasService) :Promise<Control_ActividadCultural_Entity| string> {
  try {
    let rm=await this.cntrl_actvcultMdl.findByIdAndUpdate(id,{isDeleted:true});
    traza.trazaDTO.update='';
    traza.save()
    return this.toEntity(rm);;
  } catch (error) {
    let err=new Error('Problema con eliminacion '+this.MODULE)
    traza.trazaDTO.error=err;
    traza.trazaDTO.update='';
    traza.save()
    return err.toString();
  }
  }
 
  toEntity(ps:Control_ActividadCultural_Model): Control_ActividadCultural_Entity {
      
      return {
        id:ps._id.toString(),
        name:ps.name,
        dia_actcult:ps.dia_actcult,
        hora_actcult:ps.hora_actcult,
        lugar_planificado:ps.lugar_planificado,
        ic_planificado:ps.ic_planificado,//_id.toString(),
        cp_planificado:ps.cp_planificado,
        ct_planificado:ps.cp_planificado,
        edad:ps.edad,
        edad_asistencia:ps.edad_asistencia,
        entidad_responsable:ps.entidad_responsable,//._id.toString(),
        manifestaciones_artisticas:ps.manifestaciones_artisticas,
        talentos:ps.talentos,
        apoyos:ps.apoyos,
        programas_tributa:ps.programas_tributa,
        isDeleted:ps.isDeleted,
        createdAt:ps.createdAt,
        updatedAt:ps.updatedAt
      } ;
    }
}
