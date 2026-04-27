import { Injectable } from '@nestjs/common';
import { Create_CActCult_Dto } from '../dto/create-control_actcult.dto';
import { Update_CActCult_Dto } from '../dto/update-control_actcult.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Control_ActividadCultural_Document, Control_ActividadCultural_Model } from '../schemas/control_actcult.schema';
import mongoose, { Connection, Model, Mongoose } from 'mongoose';
import { IsRelationshipProvider } from 'src/modules/common/helpers/customIdValidation';
import { TrazasService } from 'src/cultura/trazas/trazas.service';
import { Control_ActividadCultural_Entity } from '../schemas/control_actcult.entity';
import { Search_CActCult_Dto } from '../dto/search-control_actcult.dto';
import { IsAtLeastOnePlace2Insert, SearchDuplicate_KeysValue } from 'src/modules/common/errors/duplicated-value.error';
import { DataList } from 'src/modules/common/data-list';
import { ErrorModule } from 'src/modules/common/errors/error.module';
import { ErrorX } from 'src/modules/common/errors/object-not-found.error';
import { ReportsBasic_CActCult_DTO } from '../dto/reports-control_actcult.dto';
import { isArray } from 'class-validator';
import { M1_Reports_CActCult_DTO } from '../dto/reportsm1-control_actcult.dto';

@Injectable()
export class Control_ActividadCultural_Service {
  private MODULE = 'Control_ActividadCultural';
  private IS_NOT_DELETED = { isDeleted: false };
  private cstvldt: IsRelationshipProvider 
  

  constructor(@InjectModel(Control_ActividadCultural_Model.name) private readonly cntrl_actvcultMdl:Model<Control_ActividadCultural_Document>,
    @InjectConnection() private cnn:Connection
  ) {this.cstvldt= new IsRelationshipProvider(this.cnn)}

  async create(crtAC: Create_CActCult_Dto, traza:TrazasService):Promise<Control_ActividadCultural_Entity | string> {
    // virify place
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
      // Se combinan con 'T' como separador y se crea el objeto
      const fechaFinal = new Date(`${crtAC.dia_actcult}T${crtAC.hora_actcult}:00`);
      crtAC.datedAt=fechaFinal;
      console.log('con fecha', crtAC);
      
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

  /**
   * Convertir elemento a modalidad de filtro en mongoose
   * @param elemnt entidad a convertir
   * @param all si deben de buscar todos los elementos de un array o solo uno, por defecto true, si es false se busca el elemento exacto, si es true se busca dentro del array
   * @returns estructura de filtro para mongoose, si all es true se busca dentro del array, si es false se busca el elemento exacto
   */
  private checkOnAsArray(elemnt:Object,main=false): Object{
    if ( isArray(elemnt)) {
      return { $in:[elemnt]};
    }
    return elemnt;
  }

  /**
   * dar estructura de filtro a los parametros de busqueda, se pueden agregar mas casos segun las necesidades de busqueda, por ejemplo para fechas, rangos, etc
   * @param params elementos a convertir en filtro, se pueden agregar mas casos segun las necesidades de busqueda, por ejemplo para fechas, rangos, etc
   * @returns filtro para mongoose, se pueden agregar mas casos segun las necesidades de busqueda, por ejemplo para fechas, rangos, etc
   */
  private formatSearch(params:Object): Object {
    let buscar={};
     Object.keys(params).map(itm=>buscar[itm]=params[itm]);
    
    if (!!params['id']) {
        buscar['_id']=new mongoose.Types.ObjectId(params['id']);
        delete buscar['id'];        
      }   

    if (params['exactName']==false) {
      buscar['name']= { $regex: params['name'], $options: "i" };
      delete buscar['exactName'];
    }

    // rango fecha
    if (params['findia_actcult'] && params['dia_actcult']) {
      let berra=params['dia_actcult']+'T'+ (params['hora_actcult']?params['hora_actcult']:'00:00')//+':00.000z'
      let startDate= new Date (berra)
      // console.log(berra,startDate);
      let berra2=params['findia_actcult']+'T'+ (params['finhora_actcult']?params['finhora_actcult']:'23:59')+':00.000z';
      let endDate=new Date(berra2)
      // console.log(berra2,endDate);
      if (startDate > endDate) {
        let aux=endDate;
        endDate=startDate;
        startDate=aux;
      }      
      buscar['datedAt']= { $gte: startDate,$lte: endDate  };
      delete buscar['dia_actcult'];
      delete buscar['hora_actcult'];
      delete buscar['findia_actcult'];
      delete buscar['finhora_actcult'];
    }

    if (!!params['programas_tributa']) {
      if (params['principal']) {
        buscar['programas_tributa.0']=params['programas_tributa'];
        delete buscar['principal'];
        delete buscar['programas_tributa'];
      } else {
        buscar['programas_tributa']= this.checkOnAsArray(params['programas_tributa']);
      }
      
    }
  
    if (!!params['manifestaciones_artisticas']) {
      if (params['principal']) {
        buscar['manifestaciones_artisticas.0']=params['manifestaciones_artisticas'];
        delete buscar['manifestaciones_artisticas'];
      } else {
      buscar['manifestaciones_artisticas']= this.checkOnAsArray(params['manifestaciones_artisticas']);
      }
    }
    
    delete buscar['principal'];
    console.log('formatSearch',buscar);
    return  buscar;
  }

  async findAll(query:Search_CActCult_Dto): Promise<DataList<Control_ActividadCultural_Entity> | string> {
    console.log('findAll-ActCult', query);    
    let skipCount=(query.page -1 ) * query.pageSize;
    let pss=null;//to answer
    let mySrch=  this.formatSearch(query);
      delete mySrch['page'];
      delete mySrch['pageSize'];
      console.log('query',mySrch);    
    
      let fnd= await this.cntrl_actvcultMdl.find(mySrch).skip(skipCount).limit(query.pageSize).exec();
      pss=fnd.map((itm)=> this.toEntity(itm));    
    
      const dataList: DataList<Control_ActividadCultural_Entity> = {
          data: pss,
          totalPages: Math.ceil(pss.length / query.pageSize),
          currentPage: query.page,
        };
        return dataList;
  }

  async findOne(id: string):Promise<Control_ActividadCultural_Entity | string> {
    return this.toEntity(await this.cntrl_actvcultMdl.findById({_id:id}))
  }

  async get_Finance_Report(query:ReportsBasic_CActCult_DTO):Promise<Object|string> {

    let buscar=this.formatSearch(query);
    
    let camposInternosTotales={
    $addFields: {
      dineroTotalArtistas: {
        $reduce: { input: "$talentos", initialValue: 0, in: { $add: ["$$value", { $sum: "$$this.cantidad"}]}}},
      dineroTotalApoyos: {
        $reduce: { input: "$apoyos", initialValue: 0,in: {$add: ["$$value",{ $sum: "$$this.cantidad"}]}}}
      //dineroTotalArtistas: { $cond: [{ $ne: ["$talentos", null] }, "$talentos.cantidad", 0] },
      // dineroTotalApoyos: { $cond: [{ $ne: ["$apoyos", null] }, "$apoyos.cantidad", 0]       }
     
      }//fin $addFields
    }//fin objeto

    let campoInternoTotal= {
      $addFields: {
        dineroTotal: { $add: ["$dineroTotalArtistas","$dineroTotalApoyos" ]}
      }//fin $addFields
    }//fin objeto
    
    let hacerXCadaActCult= [
              {
                $project: {
                  result: 1,
                  totalPagarArt: {$sum: "$dineroTotalArtistas"},
                  totalPagarApy: {$sum: "$dineroTotalApoyos"},
                  totalPagarAct: { $sum: "$dineroTotal"},
                }
              },
            ]

    let hacerX_TodoControl=[
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 },
                  TAr: {$sum: "$dineroTotalArtistas"   },
                  TAp: {$sum: "$dineroTotalApoyos"  },
                  TAA: {$sum: "$dineroTotal"  },
                }
              },
              {
                $project: {
                  _id: 0,
                  count: 1,
                  TAr: 1,
                  TAp: 1,
                  TAA: 1,
                },
              },
            ]
    let facetQuery={
      $facet://to split
        {
          paraCadaActCult:hacerXCadaActCult ,
          paraTodos: hacerX_TodoControl
        }
    }

    let query_agg=[
        // busquedas filtros
        { $match:buscar }   
        ,
        // calculos por actCult
       camposInternosTotales
        ,
        // calculos para todas actCult
        campoInternoTotal
        ,//final de campos
        facetQuery        
      ]

      console.log(query_agg);
      
      try {
        let requestQuery=await this.cntrl_actvcultMdl.aggregate(query_agg);
        return requestQuery;
      } catch (error) {
        return error.toString();
      }     
      
  }
  
  async get_M1_Report(query:M1_Reports_CActCult_DTO):Promise<Object|string> {
    let m1={};
    let buscar=this.formatSearch(query);
    // #region InfGral
    let camposBusqueda_InformeGral={
        _id: {
          estado_actividad: "$estados_actividad.estado_actividad",
          extraPlan: "$tipoActividad_extraPlan",
        },
        cant_Actividades: {$sum: 1},
        cant_AsistenciaPersonas: { $sum: "$edad_asistencia"}
      }    
    let query_agg_ig=[
        // busquedas filtros
        { $match:buscar }   
        ,
        // calculos por actCult
        {
          $group:camposBusqueda_InformeGral
        }               
      ]
      console.log(query_agg_ig);
      
      try {
        let requestQuery_IG=await this.cntrl_actvcultMdl.aggregate(query_agg_ig);
        m1['informacion_gral'] = requestQuery_IG;
      } catch (error) {
        return error.toString();
      }
      //#endregion      
     let buscarMatch={
            ...buscar
            , 'estados_actividad.estado_actividad':'R'
            ,  tipoActividad_extraPlan:false
          } 
      // #region Etareo
      let camposBusqueda_InformeEtareo={
        _id: '$edad',
        cant_Actividades: {$sum: 1},
        cant_AsistenciPersonas: { $sum: "$edad_asistencia"}
      }    
      let query_agg_edad=[
        // busquedas filtros
        { $match:buscarMatch}   
        ,
        // calculos por actCult
        {
          $group:camposBusqueda_InformeEtareo
        }               
      ]
      console.log(query_agg_edad);      
      try {
        let requestQuery_IE=await this.cntrl_actvcultMdl.aggregate(query_agg_edad);
        m1['informacion_grupoetareo'] = requestQuery_IE;
      } catch (error) {
        return error.toString();
      } 
      //#endregion
    //#region Manifes
    let Stage01_unwind_romperArregloTalento={'$unwind': '$talentos'};
    let Stage02_lookup_camposBusqueda_InformeTalentoManifestacion={
      '$lookup': { 
          'from': 'talento_artistico',
          'let': { talentoId: { $toObjectId: '$talentos.id' } },
          'pipeline': [
            {
              '$match': {
                '$expr': { '$eq': ['$_id', '$$talentoId'] } 
              }
            }
          ],
          'as': 'talento_info'
        }
   }
   let Stage03_unwind_romperArreglo_TalentoInfo={ '$unwind': '$talento_info' };
   let Stage04_project_separarPorManifestacion ={ '$project': {
      '_id': 0, 
      'manifestacion': {
        '$arrayElemAt': [
          '$manifestaciones_artisticas', 0
        ]
      }, 
      'talento': '$talento_info.contrato_talento'
      }
    }
    let Stage05_group_agruparPorManifestacionTalentoCategoria={
       '$group': {
      '_id': {
        'idManifestacion': '$manifestacion', 
        'contratoTalento': '$talento'
      }, 
      'cantidad_Talentos': {
        '$sum': 1
      }
      }
    }
    let Stage06_lookup_camposBusqueda_InformeManifestacionNombre={'$lookup': {
      'from': 'nomenclacategorias_contmanifestacion', 
      'let': {
        'namId': {
          '$toObjectId': '$_id.idManifestacion'
        }
      }, 
      'pipeline': [
        {
          '$match': {
            '$expr': {
              '$eq': [
                '$_id', '$$namId'
              ]
            }
          }
        }, {
          '$project': {
            'name': 1, 
            '_id': 0
          }
        }
      ], 
      'as': 'manifestacion_nombre'
    }}
    let Stage07_unwind_romperArreglo_ManifestacionNombre={ '$unwind': '$manifestacion_nombre' };
    let query_agg_ManifestacionTalento: any[]=[
        // busquedas filtros
        { $match:buscarMatch}   
        ,
        Stage01_unwind_romperArregloTalento,
        Stage02_lookup_camposBusqueda_InformeTalentoManifestacion,
        Stage03_unwind_romperArreglo_TalentoInfo,
        Stage04_project_separarPorManifestacion,
        Stage05_group_agruparPorManifestacionTalentoCategoria,
        Stage06_lookup_camposBusqueda_InformeManifestacionNombre,
        Stage07_unwind_romperArreglo_ManifestacionNombre                     
      ]
      console.log(query_agg_ManifestacionTalento);      
      try {
        let requestQuery_IMT=await this.cntrl_actvcultMdl.aggregate(query_agg_ManifestacionTalento);
        m1['informe_manifestacion'] = requestQuery_IMT;
      } catch (error) {
        return error.toString();
      } 
// #endregion
  
      //#region Apoyo de Manifes
    let Stage01_unwind_romperArregloApoyos={'$unwind': '$apoyos'};
    let Stage02_lookup_camposBusqueda_InformeApoyoNomenclador={
      '$lookup': { 
          'from': 'nomenclacategorias_contmanifestacion',
          'let': { apoyoId: { $toObjectId: '$apoyos.manifest' } },
          'pipeline': [
            {
              '$match': {
                '$expr': { '$eq': ['$_id', '$$apoyoId'] } 
              }
            },
            {
              $project: { name: 1 }
            }
          ],
          'as': 'apoyo_info'
        }
   }
   let Stage03_unwind_romperArreglo_ApoyoInfo={ '$unwind': '$apoyo_info' };
   let Stage04_group_agruparPorApoyoCategoria={
       '$group': {
      '_id': {apoyoId:'$apoyo_info._id', apoyoNombre:'$apoyo_info.name'}, 
      'cantidad_ActividadesApoyo': {'$sum': 1  },
      'cantidad_APagar': {$sum: "$apoyos.cantidad"}
      }
    }
    let query_agg_Apoyo=[
        // busquedas filtros
        { $match:buscarMatch}   
        ,
        Stage01_unwind_romperArregloApoyos,
        Stage02_lookup_camposBusqueda_InformeApoyoNomenclador,
        Stage03_unwind_romperArreglo_ApoyoInfo,
        Stage04_group_agruparPorApoyoCategoria                     
      ]
      console.log(query_agg_Apoyo);      
      try {
        let requestQuery_IMA=await this.cntrl_actvcultMdl.aggregate(query_agg_Apoyo);
        m1['informacion_apoyomanifestacion'] = requestQuery_IMA;
      } catch (error) {
        return error.toString();
      } 
// #endregion
    
     return m1;
  }
  
  async update( updateControlActcultDto: Update_CActCult_Dto, traza: TrazasService):Promise<Control_ActividadCultural_Entity| string> {

    let bf=await this.findOne(updateControlActcultDto.id);

    if (!!updateControlActcultDto.dia_actcult &&
      updateControlActcultDto.dia_actcult.localeCompare( 
        Object.assign ( new Control_ActividadCultural_Entity(), bf).dia_actcult )!=0
      ) {
      const fechaFinal = new Date(`${updateControlActcultDto.dia_actcult}T${updateControlActcultDto.hora_actcult}:00`);
      updateControlActcultDto.datedAt=fechaFinal;      
    }
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
        estados_actividad:ps.estados_actividad,
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
